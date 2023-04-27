// present the selected web page in iframe

import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import './WebFrame.css';
import { useNavigate } from "react-router-dom";

function WebFrame() {
    const [{ frame }] = useStateValue();
    const navigate = useNavigate();
    
    const timestamp = [20000101, 19991001, 20010304];


    const handleBackClick = () => {
        navigate('/');
    }

    return (
        <div className="webframe">
            <div className="info-bar">
                <button onClick={() => {handleBackClick()}}>Return</button>
                <Dropdown timestamp={ timestamp }/>
                <button><a href={'https://web.archive.org/web/2000/' + frame}>Wayback Machine</a></button>
                <button><a href={frame}>Open Live</a></button>
            </div>
            <div>
                This is the message saying that the website is opened at what timestamp
            </div>
            <iframe src={'https://web.archive.org/web/2000id_/' + frame}></iframe>
        </div>
        
    )
}

function Dropdown({ timestamp }) {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        }
    })

    const handleInputClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-input" onClick={handleInputClick}>
                <div className="dropdown-selected-value">Select...</div>
                {showMenu && (
                    <div className="dropdown-menu">
                        {timestamp.map((time) => (
                            <div key={time} className="dropdown-item">
                                {time}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default WebFrame;