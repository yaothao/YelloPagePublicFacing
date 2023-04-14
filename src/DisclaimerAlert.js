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
          <p>This is a disclaimer message. Please read and accept to continue.</p>
          <button onClick={() => handleAccept()}>Accept</button>
        </div>
      )
};

export default DisclaimerAlert;