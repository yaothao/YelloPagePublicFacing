import React from "react";
import { useStateValue } from "./StateProvider";
import './WebFrame.css';

function WebFrame() {
    const [{ frame }, dispatch] = useStateValue();
    
    const handleBackClick = () => {
        dispatch({
            type: 'closeurl'
        })
    }
    return (
        <div className="webframe">
            <button onClick={() => {handleBackClick()}}>Go Back</button>
            <iframe src={frame[1]} width={'1400px'} height={'780px'}></iframe>
        </div>
        
    )
}

export default WebFrame;