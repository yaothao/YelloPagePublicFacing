import React from "react";
import './Homebar.css'

export default function Homebar({ handleAboutClicked }) {
    // the top welcome notes stays throughout the webpages 
    return (
        <div className="web-title">
<<<<<<< HEAD
            Welcome to Yellow Page Archived WebSite
            <button onClick={() => handleAboutClicked()}>About</button>
=======
            Chinese-language Websites at the Millennium
>>>>>>> 50fa6a7ea1b934791c42fddd0ca93ab94ddc5557
        </div>
    )
}