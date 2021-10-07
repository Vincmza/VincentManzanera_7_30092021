import {useState} from "react";
import React from 'react';
import SignUp from "../log/signUp"
import Login from "../log/login"
import "./index.css"

const Log = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [loginModal, setLoginModal ] = useState(false);

    const handleModals = (clic) => {
        if(clic.target.id === "register"){
            setSignUpModal(true);
            setLoginModal(false);
        } else if (clic.target.id === "login"){
            setSignUpModal(false);
            setLoginModal(true);
        }
    }   
    return (
        <div className="connection_form">
            <div className="connection_buttons">
                <div id="login" onClick={handleModals}>Se connecter</div>
                <div id="register" onClick={handleModals}>S'inscrire</div>
            </div>                      
                {signUpModal && <SignUp/>}
                {loginModal && <Login/>}      
        </div>
    );
};

export default Log;