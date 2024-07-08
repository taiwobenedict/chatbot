import { createContext, useReducer, useEffect, useMemo, useContext } from "react";
import Reducer from "../reducer";
import OpenAI from "openai";
import { UIContext } from "./UiContext";

export const chatContext = createContext();

function formatChatDateTime(time) {
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return `${formattedTime}`;
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

    const sendMessage = (message) => {
        setShowBtn(false);


        // Add message
        dispatch({
            type: "add_message",
            payload: {
                message: {
                    role: "user",
                    content: message,
                    time: formatChatDateTime(new Date()),
                },
            },
        });

        // Open system to make request
        dispatch({ type: "request", payload: true})
    };

    // const createHistory = (chat) => {
    //     console.log(chat);
    //     dispatch({
    //         type: "add_history",
    //     });
    // };

    // {
    //     title: "Lorem, ipsum dolor.",
    //     body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus reiciendis quam!",
    //     datetime: "Mon",
    //     pinned: true,
    //     active: false,
    //     id: 1
    // },

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
                        time: formatChatDateTime(new Date()),
                    },
                },
            });

            // Close system for request
            dispatch({ type: "request", payload: false})


        } catch (error) {
            console.error("Error fetching response:", error);
        }
    }


    useEffect(() => {
       if (state.request)fetchResponse(state.chats);
       // eslint-disable-next-linegi
    }, [state.request]);


    return (
        <chatContext.Provider value={{
            ...state,
            sendMessage,
            startNewChat,
        }}>
            {children}
        </chatContext.Provider>
    );
};

export default ChatContextProvider;
