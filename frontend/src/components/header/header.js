//Libraries
import {FaUserCircle} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React, {useEffect} from 'react';
import logo from '../../images/header_logo.png';
import './header.css';

function Header (props){
    return(
        <header className="head">
            <div className="head__logo">
                <NavLink exact to="/">
                    <img src={logo} alt="logo"/>
                </NavLink>
            </div>
            <nav className="head__nav">
                <button className="head__nav-user">
                    <span className="userIcon"><FaUserCircle/></span>             
                </button>
                <div className="userInfos"></div>          
            </nav>      
        </header>
    )
};

export default Header;