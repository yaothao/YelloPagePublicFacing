import React from "react";
import './Homebar.css'

export default function Homebar({ handleAboutClicked }) {
    // the top welcome notes stays throughout the webpages 
    return (
        <div className="web-title">
            Welcome to Yellow Page Archived WebSite
            <button onClick={() => handleAboutClicked()}>About</button>
        </div>
    )
}