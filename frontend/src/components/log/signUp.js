import {FaUserCircle} from "react-icons/fa";
import React from 'react';
import "./signUp.css";

const signUp = (props) => {
    return (
            <form className="signUpForm">
                <div className="userLogo"><FaUserCircle/></div>
                {/*email*/}
                <div className="emailRelated">
                    <label for="emailAdress" className="formLabel"></label>
                    <input type="email" id="emailAdress" placeholder="Adresse e-mail" required></input>
                </div>
                {/*username*/}
                <div className="userName">
                    <label for="userName" className="formLabel"></label>
                    <input type="text" id="userName" placeholder="Pseudo" required></input>
                </div>
                {/*password*/}
                <div className="passwordCreation">
                    <label for="password" className="formLabel"></label>
                    <input type="password" id="password" placeholder="Créer mot de passe" required></input>
                </div>
                <div className="passwordConfirmation">
                    <label for="password" className="formLabel"></label>
                    <input type="password" id="password" placeholder="Confirmer mot de passe" required></input>
                </div>                    
                <button type="submit" className="signUpButton">S'enregistrer</button>  
            </form>
    )
};

export default signUp;