import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import History from './History';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { UIContext } from '../context/UiContext';
import { useContext } from 'react';

function Sidebar() {
     const {active, handleToggle } = useContext(UIContext)

    let histories = [
        {
            title: "Lorem, ipsum dolor.",
            body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus reiciendis quam!",
            datetime: "Mon",
            pinned: true,
            active: false,
            id: 1
        },
        {
            title: "Lorem, ipsum dolor.",
            body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus reiciendis quam!",
            datetime: "Now",
            pinned: false,
            active: true,
            id: 2
        },
        {
            title: "Lorem, ipsum dolor.",
            body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus reiciendis quam!",
            datetime: "Jul 4",
            pinned: false,
            active: false,
            id: 3
        },
        {
            title: "Lorem, ipsum dolor.",
            body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus reiciendis quam!",
            datetime: "Jul 4",
            pinned: false,
            active: false,
            id: 4,
        },
        {
            title: "Lorem, ipsum dolor.",
            body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus reiciendis quam!",
            datetime: "Jul 4",
            pinned: false,
            active: false,
            id: 5
            
        },
        {
            title: "Lorem, ipsum dolor.",
            body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus reiciendis quam!",
            datetime: "Jul 4",
            pinned: false,
            active: false,
            id: 6
        },
        {
            title: "Lorem, ipsum dolor.",
            body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab minus reiciendis quam!",
            datetime: "Jul 4",
            pinned: false,
            active: false,
            id: 7
        },
    ]

    return (
        <div className={`sidebar pt-3 pl-3 pb-3 pr-1 ${active.toggler1 && "show-bar"}`}>
            <div  id="toggler1" onClick={(e) => handleToggle(e.target.id)} >
                <HiMiniBars3BottomRight  className='toggler sidebar-toggler-close'/>
            </div>
            
            <div className="d-flex justify-content-between align-items-center pr-3">
                <h4 className='mb-0'>My Chats</h4>
                <FaPlus className="add-icon" />
            </div>

            <div className="search">
                <FiSearch className="search-icon" />
                <input type="text" className="search-input" placeholder='Search...' />
            </div>

            <div className="histories mt-3">
                {histories.map((history, i )=> <History {...history} key={i} />)}
            </div>
        </div>
    )
}

export default Sidebar




