import { FaUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import "./login.css";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email_error")
        const passwordError = document.querySelector(".password_error")

        emailError.innerHTML = "";
        passwordError.innerHTML = "";

        /*Sending user data to connect the user's account*/

        axios({
            method: "post",
            headers: { 'Content-Type': 'application/json'},
            url: process.env.REACT_APP_API_URL+`api/auth/login`,
            withCredentials: true,
            data: {
                email,
                password 
            }
        })

        /*Storing userId and token in local storage*/

        .then((userData)=>{
            console.log(userData)
            localStorage.setItem("connectedUser", JSON.stringify(userData.data));      
            window.location = "/";
        })
        .catch((error)=>{
            console.log(error.response.data.error)
            if(error.response.data.error === "Utilisateur inconnu"){
                emailError.innerHTML = `<p>Identifiant incorrect ou mot de passe inccorect</p>`;
                passwordError.innerHTML = `<p>Identifiant incorrect ou mot de passe inccorect</p>`;
            }
            if(error.response.data.error === "Mot de passe incorrect"){
                emailError.innerHTML = `<p>Identifiant incorrect ou mot de passe inccorect</p>`;
                passwordError.innerHTML = `<p>Identifiant incorrect ou mot de passe inccorect</p>`;
            }
            if(error.response.data.erreur === "Compte désactivé !"){
                emailError.innerHTML = `<p>Identifiant inconnu</p>`;
                passwordError.innerHTML = `<p>Mot de passe inconnu</p>`;
            }
        })
    }

    /*Login form*/

    return (
        <form className="loginForm" onSubmit={handleLogin} id="login_form">
            <div className="userLogo">
                <FaUserCircle />
            </div>
            <div className="loginEmailRelated">
                <label for="emailAdress" className="formLabel"></label>
                <input 
                    type="email" 
                    id="emailAdress" 
                    placeholder="Adresse e-mail" 
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    required
                />
            </div>
            <div className="email_error"></div>
            <div className="passwordRelated">
                <label for="password" className="formLabel"></label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Mot de passe" 
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    required
                />
            </div>
            <div className="password_error"></div>
            <button type="submit" className="loginButton">
                Connexion
            </button>
        </form>
    );
}

export default Login;
