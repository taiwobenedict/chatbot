import React, { useEffect, useState, useContext } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import History from './History';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { UIContext } from '../context/UiContext';
import { chatContext } from '../context/ChatContext';

function Sidebar() {
    const { active, handleToggle } = useContext(UIContext);
    const { startNewChat, histories, fetchHistories, user } = useContext(chatContext);
    const [query, setQuery] = useState("");
    const [filteredHistories, setFilteredHistories] = useState([]);

    useEffect(() => {
        fetchHistories(user.id);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (query === "") {
            setFilteredHistories(histories);
        } else {
            const filtered = histories.filter(history =>
                history.title.toLowerCase().includes(query.toLowerCase()) ||
                history.body.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredHistories(filtered);
        }
    }, [query, histories]);

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className={`sidebar pt-3 pl-3 pb-3 pr-1 ${active.toggler1 && "show-bar"}`}>
            <div id="toggler1" onClick={(e) => handleToggle(e.target.id)}>
                <HiMiniBars3BottomRight className='toggler sidebar-toggler-close' />
            </div>

            <div className="d-flex justify-content-between align-items-center pr-3">
                <h4 className='mb-0'>My Chats</h4>
                <FaPlus className="add-icon" onClick={startNewChat} />
            </div>

            <div className="search">
                <FiSearch className="search-icon" />
                <input type="text" className="search-input" placeholder='Search...' value={query} onChange={handleSearch} />
            </div>

            <div className="histories mt-3 w-100">
                {filteredHistories.map((history, i) => <History {...history} key={i} clearSearch={setQuery} />)}
            </div>
        </div>
    );
}

export default Sidebar;
