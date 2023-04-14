import React from "react";
import './Homebar.css'
import { Link } from 'react-router-dom'

export default function Homebar() {
    // the top welcome notes stays throughout the webpages 
    return (
        <div className="web-title">
            <ul className="menu-list">
                <li>Chinese-language Websites at the Millennium</li>
                <li className="menu-item"><Link to='/'>Home</Link></li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>            
        </div>
    )
}