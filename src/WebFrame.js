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
                showcase_timestamp: currentTimeStamp,
                timestamps: ["Select a timestamp", ...timestamps],
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
                <button onClick={() => {handleBackClick()}}>Go back</button>
                <Dropdown timestamp={ showcase_timestamp } options={availableTimestamps} handleInputSelected={handleInputSelected}/>
                <a className="button" target="_blank" rel="noopener noreferrer" href={'https://web.archive.org/web/' + currentTimeStamp + '/' + currentUrl}>Open in Wayback Machine</a>
                <a className="button" href={currentUrl}>Open Live</a>
            </div>
            <div style={{margin: '0.5em', textAlign: 'center', lineHeight:'1.5em'}}>
                You opened {currentUrl} archived by the Wayback Machine at: {currentTimeStamp}. <br/> The URL of the actual web page displayed below might be different from the one you opened. <br/> The Y2K Chinese-language Web Showcase is not responsible for the content of the web page. <br/> 
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