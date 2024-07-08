import React, { useContext } from 'react'
import { FaRegEdit } from "react-icons/fa";
import UserMsg from "../images/UserMsg.png"
import AIimage from '../images/AIimage.png'
import { MdContentCopy } from "react-icons/md";
import SlowText from './TextAnimation';
import { UIContext } from "../context/UiContext"
import { SyncLoader } from 'react-spinners'




export function Message({ content, time }) {


    return (
        <div className='chat mb-4 position-relative'>
            <div className="chat-img">
                <img src={UserMsg} alt="" />
            </div>
            <div className="chat-heading pl-4 d-flex align-items-center mb-1">
                <p className="m-0 font-weight-bold mr-3">You</p>
                <p className='text-muted m-0'>{time}</p>
            </div>
            <div className=" message chat-body d-flex align-items-end">
                <p className="m-0 mr-2"> {content} </p>
                <FaRegEdit className='edit-chat' />
            </div>
        </div>
    )
}


export function Response({ content, time }) {
    const { showBtn, loading } = useContext(UIContext)
    return (
        <div className='chat mb-4 position-relative'>
            <div className="chat-img">
                <img src={AIimage} alt="" />
            </div>

            <div className="d-flex justify-content-between">
                <div className="chat-heading pl-4 d-flex align-items-center mb-1">
                    <p className="m-0 font-weight-bold mr-3">Response</p>
                    <p className='text-muted m-0'>{time}</p>
                </div>

            </div>


            <div className=" response chat-body  border shadow-sm">
                <div className="m-0 mr-2"><SlowText text={content} speed={0.05} /></div>
                <div className="ml-auto justify-content-end d-flex align-items-center mt-3">
                    <div className={`align-items-center custom-btn ${showBtn && "show-btn"}`}>
                        <MdContentCopy className='mr-1' />
                        <span>Copy</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AILoading() {
    return (
        <div className='chat mb-4 position-relative'>
            <div className="chat-img">
                <img src={AIimage} alt="" />
            </div>

            <div className="d-flex justify-content-between">
                <div className="chat-heading pl-4 d-flex align-items-center mb-1">
                    <p className="m-0 font-weight-bold mr-3">Response</p>
                    <p className='text-muted m-0'></p>
                </div>

            </div>


            <div className=" response chat-body">
                <div className="m-0 mr-2"><SyncLoader color='#ccc' speedMultiplier={1} /></div>

            </div>
        </div>

    )
}


