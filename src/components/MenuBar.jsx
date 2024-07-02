import React from 'react'
import { PiChats } from "react-icons/pi";
import { MdExitToApp } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useContext } from "react";
import { UIContext } from '../context/UiContext';


function MenuBar() {
    const { handleToggle } = useContext(UIContext)

    return (
        <div className='menubar px-1 pt-3 border-right'>
            <FaPlus className="add-icon mb-3 menu-add-icon" />
            <PiChats className="toggler mb-2 mb-3 menu-chats-icon" id="toggler1" onClick={(e) => handleToggle(e.target.id)} />
            <MdExitToApp className='toggler mb-3 menu-exit-icon' id="toggler2" onClick={(e) => handleToggle(e.target.id)} />

        </div>
    )
}

export default MenuBar
