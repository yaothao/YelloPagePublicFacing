import React from "react";

function About({backBotton}) {
    return (
        <div className="about-page">
            <button onClick={() => backBotton()}>Go Back</button>
            <h1>This is the about page</h1> 
            <p>This website present you a variaty of archived Chinese Websites</p>
        </div>
             
    )
    
}

export default About;