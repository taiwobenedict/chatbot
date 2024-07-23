import React, { useContext, useState } from 'react'
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
            <div className=" message chat-body justify-content-between d-flex align-items-end">
                <p className="m-0 mr-2"> {content} </p>
            </div>
        </div>
    )
}


export function Response({ content, time }) {
    const { showBtn } = useContext(UIContext);
    const [buttonText, setButtonText] = useState('Copy');

    const handleCopy = () => {
        navigator.clipboard.writeText(content).then(() => {
            setButtonText('Copied');
            setTimeout(() => setButtonText('Copy'), 2000);
        });
    };

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

            <div className="response chat-body justify-content-between border shadow-sm">
                <div className="m-0 mr-2"><SlowText text={content} speed={0} /></div>
                <div className="ml-auto justify-content-end d-flex align-items-center mt-3">
                    <div 
                        className={`align-items-center custom-btn ${showBtn && "show-btn"}`} 
                        onClick={handleCopy}
                        style={{ cursor: 'pointer' }}
                    >
                        <MdContentCopy className='mr-1' />
                        <span>{buttonText}</span>
                    </div>
                </div>
            </div>
        </div>
    );
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


            <div className=" response chat-body justify-content-between">
                <div className="m-0 mr-2"><SyncLoader color='#ccc' speedMultiplier={1} /></div>

            </div>
        </div>

    )
}


