import React, { useContext, useState } from 'react'
import { AILoading, Message, Response } from './Chat'
import { CiPaperplane } from "react-icons/ci";
import { chatContext } from '../context/ChatContext';
import Logo from "../images/Logo.png"


function MainScreen() {
    const [message, setMessage] = useState("")
    const { chats, sendMessage, loading } = useContext(chatContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (message !== "") {
            sendMessage(message)
            setMessage("")
        }
    }

    return (
        <div className='mainscreen flex-grow-1 position-relative pb-0'>


            {
                chats.length === 1 ? (
                    <div className='welcome w-100 d-flex justify-content-center align-items-end'>
                        <div className='w-100 d-flex justify-content-center'>
                            <div>
                                <div className="logo d-flex justify-content-center mb-3">
                                    <div className="logo-img">
                                        <img src={Logo} alt="" />
                                    </div>
                                </div>
                                <h4>How can I help you toady?</h4>
                            </div>
                        </div>
                    </div>
                )
                    : (
                        <div className="chats">
                            {
                                chats.slice(1).map((message, i) => (
                                    message?.role === "user" ? <Message {...message} key={i} /> : message?.role === "assistant" ? <Response {...message} key={i} /> : null
                                ))
                            }

                            {
                                loading && <AILoading />
                            }

                        </div>
                    )
            }

            <div className='form-container'>
                <form onSubmit={handleSubmit} className="question">
                    <div className=" border rounded d-flex align-items-center sec-bg p-2 shadow-sm ">
                        <input type="text" className="question-input w-100 h-100 border-0" placeholder='Ask questions or type "/" for commands' value={message} onChange={(e) => setMessage(e.target.value)} />
                        <CiPaperplane className="question-icon" size={35} onClick={handleSubmit} />
                    </div>
                    <div className="box"></div>
                </form>

            </div>


        </div>
    )
}

export default MainScreen
