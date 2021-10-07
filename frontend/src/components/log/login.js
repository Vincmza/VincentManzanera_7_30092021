import {FaUserCircle} from "react-icons/fa";
import React, {useEffect} from 'react';
import './login.css';

function Login (props){
     return (

        <form>
            <div className="userLogo"><FaUserCircle/></div>
            <div className="emailRelated">
                <label for="emailAdress" className="formLabel"></label>
                <input type="email" id="emailAdress" placeholder="Adresse e-mail"></input>
            </div>
            <div className="passwordRelated">
                <label for="password" className="formLabel"></label>
                <input type="password" id="password" placeholder="Mot de passe"></input>
            </div>
            <button type="submit" className="loginButton">Connexion</button>

            <p className="signupSentence">Toujours pas inscrit ?<br/> Cliquez sur le bouton en dessous</p>
        
            <button type="submit" className="signupButton">S'enregistrer</button>
            
        </form>

     )
};

export default Login;