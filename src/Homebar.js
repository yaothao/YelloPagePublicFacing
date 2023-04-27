import React from "react";
import './Homebar.css'
import { Link } from 'react-router-dom'
import sitelogo from './sitelogo.svg'

export default function Homebar({ handleHomePageClick }) {
    // the top welcome notes stays throughout the webpages 
    return (
        <div className="web-title">
            <Link to='/'><img src={sitelogo} alt="Logo" /></Link>
            <ul className="menu-list">
                <li className="menu-item"><Link to='/' onClick={handleHomePageClick}>Home</Link></li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>            
        </div>
    )
}