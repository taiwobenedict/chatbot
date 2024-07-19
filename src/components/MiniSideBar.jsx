import React from 'react'
import User from '../images/User.png'
import Signout from "../images/Signout.png"
import Contact from "../images/Contact.png"
import Logo from "../images/Logo.png"
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { useContext } from 'react';
import { UIContext } from '../context/UiContext';
import { chatContext } from '../context/ChatContext'
import { auth } from '../firestore'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'

function MiniSideBar() {
    const {user,  dispatch } = useContext(chatContext)
    const {active, handleToggle} = useContext(UIContext)
    const navigate = useNavigate()
    const alert = useAlert()
    
    
    async function logOut () {
        signOut(auth).then(() => {
            new Promise((resolve, reject) => {
                dispatch({
                    type: "logout_user",
                 
                })
                resolve()
            }).then(() => {
                alert.info("You've logged out!")
                navigate('/auth')
            })
          }).catch((error) => {
            alert.error("Something went wrong!")
          });
    }
    
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
                    <p className="mt-2">{user?.name}</p>
                </div>
                <div className="logout d-flex align-items-center pointer" onClick={logOut}>
                    <div className="logout-icon mr-2">
                        <img src={Signout} alt="" />
                    </div>
                    <h6 className="mb-0">Log out</h6>
                </div>
                <a href='http://www.mitrealaw.ro' target='_blank' rel='noreferrer' className="logout d-flex align-items-center mt-5">
                    <div className="logout-icon mr-2">
                        <img src={Contact} alt="" />
                    </div>
                    <p className="mb-0 pri-text">Contact Andrei Mitrea</p>
                </a>
            </div>

        </div>
    )
}

export default MiniSideBar
