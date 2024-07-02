import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import UserMsg from "../images/UserMsg.png"
import AIimage from '../images/AIimage.png'
import { LuRotateCw } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'


export function Message({ text, datetime }) {
    return (
        <div className='chat mb-4 position-relative'>
            <div className="chat-img">
                <img src={UserMsg} alt="" />
            </div>
            <div className="chat-heading pl-4 d-flex align-items-center mb-1">
                <p className="m-0 font-weight-bold mr-3">You</p>
                <p className='text-muted m-0'>{datetime}</p>
            </div>
            <div className=" message chat-body d-flex align-items-end">
                <p className="m-0 mr-2">{text}</p>
                <FaRegEdit className='edit-chat' />
            </div>
        </div>
    )
}


export function Response({ text, datetime, paginator = null }) {
    return (
        <div className='chat mb-4 position-relative'>
            <div className="chat-img">
                <img src={AIimage} alt="" />
            </div>

            <div className="d-flex justify-content-between">
                <div className="chat-heading pl-4 d-flex align-items-center mb-1">
                    <p className="m-0 font-weight-bold mr-3">Response</p>
                    <p className='text-muted m-0'>{datetime}</p>
                </div>
                {
                    paginator &&
                    <div className="mb-1 d-flex align-items-center">
                        <span className="custom-btn p-1 d-flex align-items-center justify-content-center rounded"><FaChevronLeft /></span>
                        <span className='mx-1'>1/3</span>
                        <span className="custom-btn p-1 d-flex align-items-center justify-content-center rounded"><FaChevronRight /></span>
                    </div>
                }

            </div>


            <div className=" response chat-body  border shadow-sm">
                <p className="m-0 mr-2">{text}</p>
                <div className="ml-auto justify-content-end d-flex align-items-center">
                    <div className="d-flex align-items-center custom-btn mr-3">
                        <LuRotateCw className='mr-1' />
                        <span>Regenerate</span>
                    </div>
                    <div className="d-flex align-items-center custom-btn">
                        <MdContentCopy className='mr-1' />
                        <span>Copy</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


