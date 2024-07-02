import React from 'react'
import User from '../images/User.png'
import Signout from "../images/Signout.png"
import Contact from "../images/Contact.png"
import Logo from "../images/Logo.png"
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { useContext } from 'react';
import { UIContext } from '../context/UiContext';

function MiniSideBar() {
    const {active, handleToggle} = useContext(UIContext)
    return (
        <div className={`mini-sidebar p-2 pt-3 ${active.toggler2 && "show-bar"}`}>
            <div className='mini-toggler-close' id="toggler2" onClick={(e) => handleToggle(e.target.id)} >
                <HiMiniBars3BottomRight  className='toggler'/>
            </div>

            <div className="logo d-flex">
                <div className="logo-img mr-2">
                    <img src={Logo} alt="" />
                </div>
                <div className="logo-text mt-2">Chat</div>
            </div>


            <div className="sidebar-footer">
                <div className="user mb-3">
                    <img src={User} alt="" />
                </div>
                <div className="logout d-flex align-items-center">
                    <div className="logout-icon mr-2">
                        <img src={Signout} alt="" />
                    </div>
                    <h6 className="mb-0">Log out</h6>
                </div>
                <div className="logout d-flex align-items-center mt-5">
                    <div className="logout-icon mr-2">
                        <img src={Contact} alt="" />
                    </div>
                    <p className="mb-0 pri-text">Contact Andrei Mitrea</p>
                </div>
            </div>

        </div>
    )
}

export default MiniSideBar
