import React from "react";
import { useNavigate } from "react-router-dom";

function DisclaimerAlert ({callback}) {
    const navigate = useNavigate();
    const handleAccept = () => {
        localStorage.setItem('hasAccepted','true');
        callback();
        navigate('/');
    }

    return (
        <div className="disclaimer-alert">
          <h1>Disclaimer</h1>
          <p>By clicking the button below you acknowledge that you have read and agree to the following terms: </p>
          <p>

The purpose of this website is to preserve the history of the internet and showcase the evolution of web design and technology in Chinese-language websites. The websites showcased on this website are from the late 1990s and early 2000s and may contain outdated information, designs, and functionalities. The content on these websites does not reflect the views or opinions of the owners of this website. Visitors are advised to use their own discretion when browsing these websites and should not rely on the information presented as accurate or current. The owners of this website are not responsible for any harm, damage, or loss that may occur from using the content or information provided on these old websites. If you are the owner of one of the archived websites and wish to have your site removed from this website, please contact tktktk@tktktk.com</p>

          <button onClick={() => handleAccept()}>Accept</button>
        </div>
      )
};

export default DisclaimerAlert;