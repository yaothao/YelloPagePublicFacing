import React from "react";
import './Homebar.css'

export default function Homebar({ handleAboutClicked }) {
    // the top welcome notes stays throughout the webpages 
    return (
        <div className="web-title">
            <ul className="menu-list">
                <li className="menu-item">Chinese-language Websites at the Millennium</li>
                <li className="menu-item clickable">Home</li>
                <li className="menu-item clickable" onClick={() => handleAboutClicked()}>
                    About
                </li>
            </ul>            
        </div>
    )
}