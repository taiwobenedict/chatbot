import React, { createContext, useReducer, useEffect, useMemo, useContext, useState } from "react";
import OpenAI from "openai";
import { UIContext } from "./UiContext";
import { v4 as uuid4 } from "uuid";
import { doc, getDocs, collection, addDoc, query, where, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../firestore";
import Reducer from "../reducer"
import { useAlert } from "react-alert";

export const chatContext = createContext();

function formatChatDateTime(time) {
    const day = time.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[time.getMonth()];
    const date = `${day}/${month}`;

    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return { date, formattedTime };
}

function extractTitleAndBody(text) {
    let title = text.slice(0, 20);
    if (title[title.length - 1] !== '.') {
        title += '.';
    }

    let body = text.slice(0, 75);
    if (text.length > 75) {
        body += '...';
    }

    return { title, body };
}

const ChatContextProvider = ({ children }) => {
    const { setShowBtn } = useContext(UIContext);
    const alert = useAlert()

    const initialState = {
        loading: false,
        chats: [{ role: 'system', content: `You are a helpful assistant to give all the information about life` }],
        histories: [],
        newChat: true,
        request: false,
        user: null,
    };

    const [state, dispatch] = useReducer(Reducer, initialState);
    const [tempMessages, setTempMessages] = useState([]);
    const [activeHistoryId, setActiveHistoryId] = useState("");

    const openai = useMemo(() => new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true }), []);

    // Function to send a user message
    const sendMessage = (message) => {
        setShowBtn(false);

        if (state.newChat) {
            const id = uuid4();
            setActiveHistoryId(id);
        }

        const formattedTime = formatChatDateTime(new Date()).formattedTime;

        dispatch({
            type: "add_message",
            payload: {
                message: {
                    role: "user",
                    content: message,
                    time: formattedTime,
                    createdAt: new Date(), // Store createdAt as a JavaScript Date object
                },
            },
        });

        setTempMessages(prev => [...prev, {
            role: "user",
            content: message,
            time: formattedTime,
            createdAt: new Date(), // Store createdAt in tempMessages
        }]);

        dispatch({ type: "request", payload: true });
    };

    // Function to create a chat history
    const createHistory = (chat) => {
        dispatch({ type: "add_history", payload: chat });
        storeChatHistory(state.user.id, chat); // Call to store the chat history
    };

    // Function to start a new chat
    const startNewChat = () => {
        dispatch({ type: "start_new_chat" });
    };

    // Function to fetch response from OpenAI
    const fetchResponse = async (chats) => {
        try {
            const completion = await openai.chat.completions.create({
                messages: chats,
                model: "gpt-4-turbo",
            });

            const newMessage = {
                ...completion.choices[0].message,
                time: formatChatDateTime(new Date()).formattedTime,
                createdAt: new Date(), // Store createdAt as a JavaScript Date object
            };

            setTempMessages(prev => [...prev, newMessage]);

            dispatch({
                type: "add_message",
                payload: {
                    message: newMessage,
                },
            });

            dispatch({ type: "request", payload: false });

            if (state.newChat) {
                createHistory({
                    title: extractTitleAndBody(chats[1].content).title,
                    body: extractTitleAndBody(completion.choices[0].message.content).body,
                    datetime: formatChatDateTime(new Date()).date,
                    active: true,
                    id: activeHistoryId,
                    createdAt: new Date(), // Store createdAt as a JavaScript Date object
                });
            }
        } catch (error) {
            dispatch({ type: "error" });

            alert.error("Something went wrong! Check your internet connection",{
                timeout: 0,
            })
        }
    };

    // Function to store chat history in Firestore
    const storeChatHistory = async (userId, chat) => {
        try {
            const historyRef = collection(db, `chatHistories`);
            await addDoc(historyRef, {
                userId: userId,
                id: chat?.id,
                title: chat?.title,
                body: chat?.body,
                active: false,
                datetime: chat?.datetime,
                createdAt: new Date(), // Store createdAt as a JavaScript Date object
            });
        } catch (error) {
            console.error('Error storing chat history:', error);
        }
    };

    // Function to store a message in a conversation
    const storeMessage = async (userId, historyId, message) => {
        try {
            const messageRef = doc(db, 'conversations', userId); // Reference to the userId city document
            const historyRef = collection(messageRef, historyId);
            await addDoc(historyRef, {
                role: message?.role,
                content: message?.content,
                time: message?.time,
                createdAt: new Date(), // Store createdAt as a JavaScript Date object
            });
        } catch (error) {
            console.error('Error storing message:', error);
        }
    };

    // Function to fetch all messages from a conversation
    const fetchAllMessages = async (userId, historyId) => {
        try {
            const messages = [{ role: 'system', content: `You are a helpful assistant to give all the information about life` }].reverse();
            const q = query(collection(db, `conversations/${userId}/${historyId}/`), orderBy('createdAt', 'asc'))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                messages.push({
                    id: doc.id,
                    ...doc.data()
                });
            });


            dispatch({
                type: "set_messages",
                payload: messages
            });

            setActiveHistoryId(historyId);

        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Function to fetch chat histories for a specific user
    const fetchHistories = async (userId) => {
        try {
            const collectionRef = collection(db, 'chatHistories');
            const q = query(collectionRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const fetchedDocuments = querySnapshot.docs.map(doc =>  {

                return ({
                    ...doc.data(),
                    uid: doc.id,
            })}
        );

            dispatch({
                type: "set_histories",
                payload: fetchedDocuments
            });
        } catch (error) {
            console.error('Error fetching histories:', error);
        }
    };


    const deleteHistory = async (historyId, id) => {
        try {
            // Reference to the document
            const docRef = doc(db, 'chatHistories', historyId);

            // Delete the document
            await deleteDoc(docRef);
             alert.info('Chat history successfully deleted!');
             dispatch({
                type: "remove_history",
                payload: id
            })
        } catch (err) {
          alert.error("Chat history not deleted! Something went wrong.")

        }
    };

    // useEffect to fetch response when there is a request
    useEffect(() => {
        if (state.request) {
            fetchResponse(state.chats);
        }
        // eslint-disable-next-line
    }, [state.request]);

    // useEffect to store temp messages when there are any
    useEffect(() => {
        if (tempMessages.length > 0 && activeHistoryId) {
            tempMessages.forEach(tempMessage => storeMessage(state.user.id, activeHistoryId, tempMessage));
            setTempMessages([]);
        }
        // eslint-disable-next-line
    }, [tempMessages, activeHistoryId]);

    // Provide the context with all necessary values and functions
    return (
        <chatContext.Provider value={{
            ...state,
            sendMessage,
            startNewChat,
            createHistory,
            dispatch,
            storeChatHistory,
            storeMessage,
            fetchAllMessages,
            fetchHistories,
            deleteHistory,
        }}>
            {children}
        </chatContext.Provider>
    );
};

export default ChatContextProvider;
