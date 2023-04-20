// present the selected web page in iframe

import React from "react";
import { useStateValue } from "./StateProvider";
import './WebFrame.css';
import { useNavigate } from "react-router-dom";

function WebFrame() {
    const [{ frame }] = useStateValue();
    const navigate = useNavigate();
    
    const handleBackClick = () => {
        navigate('/');
    }

    return (
        <div className="webframe">
            <button onClick={() => {handleBackClick()}}>Return</button>
            <iframe src={frame} width={'1400px'} height={'730px'}></iframe>
        </div>
        
    )
}

export default WebFrame;