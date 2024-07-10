import { createContext, useReducer, useEffect, useMemo, useContext } from "react";
import Reducer from "../reducer";
import OpenAI from "openai";
import { UIContext } from "./UiContext";
import { toast } from "react-toastify";
import {v4 as uuid4} from "uuid"


export const chatContext = createContext();

function formatChatDateTime(time) {
  
    const day = time.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[time.getMonth()];
    const date = `${day}/${month}`


    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return {
        date,
        formattedTime,
    };
}

function extractTitleAndBody(text) {

    let title;
    let body;

    title = text.slice(0, 20);
    if (title[title.length - 1] !== '.') {
        title += '.';
    }


    body = text.slice(0, 75);

    // Check if body exceeds 80 characters
    if (text.length > 75) {
        body  += '...'
    }

    return {
        title: title,
        body: body
    };
}

const ChatContextProvider = ({ children }) => {
    const { setShowBtn } = useContext(UIContext);
    const initialState = {
        loading: false,
        chats: [{ role: 'system', content: `You are a helpful assistant to give all the information about life` }],
        histories: [],
        newChat: true,
        request: false,
    };

    const [state, dispatch] = useReducer(Reducer, initialState);

    const openai = useMemo(() => {
        return new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    }, []);

    // Send Message
    const sendMessage = (message) => {
        setShowBtn(false);


        // Add message
        dispatch({
            type: "add_message",
            payload: {
                message: {
                    role: "user",
                    content: message,
                    time: formatChatDateTime(new Date()).formattedTime,
                },
            },
        });

        // Open system to make request
        dispatch({ type: "request", payload: true})
    };

    // Create History
    const createHistory = (chat) => {
        dispatch({
            type: "add_history",
            payload: chat
        });
    };

    // Start New Chat
    const startNewChat = () => {
        dispatch({
            type: "start_new_chat",

        });
    };

    // Get Answers for question
    async function fetchResponse(chats) {
        try {
            const completion = await openai.chat.completions.create({
                messages: chats,
                model: "gpt-4-turbo",
            });


            // Add answers
            dispatch({
                type: "add_message",
                payload: {
                    message: {
                        ...completion.choices[0].message,
                        time: formatChatDateTime(new Date()).formattedTime,
                    },
                },
            });

            // Close system for request
            dispatch({ type: "request", payload: false})


            // Create History
            if (state.newChat) {
                createHistory({
                    title: extractTitleAndBody(chats[1].content).title,
                    body: extractTitleAndBody(completion.choices[0].message.content).body,
                    datetime: formatChatDateTime(new Date()).date,
                    active: true,
                    id: uuid4()
                })
            }


        } catch (error) {
            toast.error("Something went wrong",)
            dispatch({
                type: "error"
            })
        }
    }


    useEffect(() => {
       if (state.request)fetchResponse(state.chats);
       
       // eslint-disable-next-line
    }, [state.request]);


    return (
        <chatContext.Provider value={{
            ...state,
            sendMessage,
            startNewChat,
            createHistory,
        }}>
            {children}
        </chatContext.Provider>
    );
};

export default ChatContextProvider;
