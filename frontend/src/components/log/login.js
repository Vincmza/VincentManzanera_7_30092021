import { FaUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import env from "react-dotenv";
import "./login.css";
import axios from "axios";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email_error")
        const passwordError = document.querySelector(".password_error")

        axios({
            method: "post",
            headers: { 'Content-Type': 'application/json'},
            url: `http://localhost:8081/api/auth/login`,
            withCredentials: true,
            data: {
                email,
                password 
            }
        })
        .then((userData)=>{
            console.log(userData)
            window.location = "/";
        })
        .catch((err)=>{
            console.log(err)
            emailError.innerHTML = `<p>email ou mot de passe incorrecte</p>`;
            passwordError.innerHTML = `<p>email ou mot de passe incorrecte</p>`;
        })
    }
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
