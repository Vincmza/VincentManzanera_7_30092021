import {FaUserCircle} from "react-icons/fa";
import React, {useEffect} from 'react';
import './footer.css';
import logo from '../../images/icon.png'

function Footer (props){ 
    return(
        <footer className="foot">
            <div className="foot__logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="foot__mentions">Mentions légales</div>
            <div className="foot__contact"><a href="mailto:groupomania_socialnetwork@outlook.fr" title="Envoyer un email">Contacter l'assistance</a></div>
        </footer>
    )
};

export default Footer;