import React from "react";
import './Homebar.css'
import { Link } from 'react-router-dom'
import sitelogo from './sitelogo.svg'

export default function Homebar({ handleHomePageClick }) {
    // the top welcome notes stays throughout the webpages 
    return (
        <div className="web-title">
            <Link to='/' onClick={handleHomePageClick}><img src={sitelogo} alt="Logo" /></Link>
            <ul className="menu-list">
                <li className="menu-item"><Link to='/'>Home 目录</Link></li>
                <li>
                    <Link to='/about'>About 关于</Link>
                </li>
            </ul>            
        </div>
    )
}