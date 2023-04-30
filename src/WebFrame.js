// present the selected web page in iframe

import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import './WebFrame.css';
import { useNavigate } from "react-router-dom";

function WebFrame() {
    const [{ url, showcase_timestamp, timestamps}] = useStateValue();
    const [currentTimeStamp, setCurrentTimeStamp] = useState(showcase_timestamp);
    const [currentUrl, setCurrentUrl] = useState(url);
    const [availableTimestamps, setAvailableTimeStamps] = useState(["Select a timestamp", ...timestamps]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!url) {
            const frameObject = JSON.parse(localStorage.getItem('frame-object'));
            setCurrentUrl(frameObject.url);
            setCurrentTimeStamp(frameObject.showcase_timestamp);
            setAvailableTimeStamps(frameObject.timestamps);
        } else {
            const item = {
                url: url,
                showcase_timestamp: showcase_timestamp,
                timestamps: timestamps,
            }
            localStorage.setItem('frame-object', JSON.stringify(item));
        }
    }, [url, showcase_timestamp, timestamps])

    const handleBackClick = () => {
        navigate('/');
    }

    const handleInputSelected = (value) => {
        setCurrentTimeStamp(value);
    };

    return (
        <div className="webframe">
            <div className="info-bar">
                <button onClick={() => {handleBackClick()}}>Return</button>
                <Dropdown timestamp={ showcase_timestamp } options={availableTimestamps} handleInputSelected={handleInputSelected}/>
                <button><a href={'https://web.archive.org/web/' + currentTimeStamp + '/' + currentUrl}>Wayback Machine</a></button>
                <button><a href={currentUrl}>Open Live</a></button>
            </div>
            <div>
                You chose to view {currentUrl} archived by the Wayback Machine at: {currentTimeStamp}
            </div>
            <iframe src={'https://web.archive.org/web/' + currentTimeStamp + '/' + currentUrl}></iframe>
        </div>
        
    )
}

function Dropdown({ timestamp, options, handleInputSelected }) {
    const [currentTimeStamp, setCurrentTimeStamp] = useState(timestamp);

    const handleInputClick = (e) => {
        e.stopPropagation();
        const value = e.target.value
        if (value !== "Select a timestamp") {
            setCurrentTimeStamp(value);
            handleInputSelected(value);
        };
    };

    return (
        <div className="dropdown-select">
            <select onChange={handleInputClick} className="dropdown-menu">
                {options.map((time) => (
                    <option key={time} className="dropdown-item">
                        {time}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default WebFrame;