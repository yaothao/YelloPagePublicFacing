import React from "react";
import './Homebar.css'

export default function Homebar({ handleAboutClicked }) {
    // the top welcome notes stays throughout the webpages 
    return (
        <div className="web-title">
            Chinese-language Websites at the Millennium            
            <button onClick={() => handleAboutClicked()}>About</button>
        </div>
    )
}