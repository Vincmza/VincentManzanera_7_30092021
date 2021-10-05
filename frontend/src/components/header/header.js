//Libraries
import {FaUserCircle} from "react-icons/fa";
import React, {useEffect} from 'react';
import './header.css';
import logo from '../../images/header_logo.png';


function Header (props){
    return(
        <header className="head">
            <div className="head__logo">
                <img src={logo} alt="logo"/>
            </div>
            <nav className="head__nav">
                <button className="head__nav-user">
                    <span className="userIcon"><FaUserCircle/></span>             
                </button>            
            </nav>      
        </header>
    )
};

export default Header;