import {FaUserCircle} from "react-icons/fa";
import React, { useState } from 'react';
import axios from "axios";
import "./signUp.css";

const SignUp = (props) => {
    const [username, setPseudo]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [passwordConfirm, setPasswordConfirm]=useState("");

    const handleRegister = async (e) =>{
        e.preventDefault();
        const emailError = document.querySelector(".signUp_email_error");
        const passwordError = document.querySelector(".signUp_password_error");
        const passConfirmError = document.querySelector(".signUp_password_confirmation_error");

        emailError.innerHTML = "";
        passwordError.innerHTML = "";
        passConfirmError.innerHTML = "";

        if(password !== passwordConfirm){
            passConfirmError.innerHTML = `<p>Les mots de passe ne correspondent pas</p>`;
            passwordError.innerHTML = `<p>Les mots de passe ne correspondent pas</p>`;
        }
        else {
            axios({
                method: "post",
                headers: { 'Content-Type': 'application/json'},
                url: `http://localhost:8081/api/auth/signup`,
                withCredentials: true,
                data: {
                    email,
                    password,
                    username
                }
            })
            .then((res)=>{
                alert("Utilisateur créé")
                // window.location = "/";
                console.log(res)

            })
            .catch((err)=> {
                console.log(err)
                emailError.innerHTML = `<p>Email incorrect</p>`;
                passwordError.innerHTML = `<p>Utilisez un mot de passe plus complexe</p>`;
            })
        }
    }

    return (
            <form className="signUpForm" id="sign_up_form" onSubmit={handleRegister}>
                <div className="userLogo"><FaUserCircle/></div>
                {/*email*/}
                <div className="emailRelated">
                    <label for="emailAdress" className="formLabel"></label>
                    <input 
                        type="email" 
                        id="emailAdress" 
                        placeholder="Adresse e-mail" 
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        required
                    >
                    </input>
                </div>
                <div className="signUp_email_error"></div>
                {/*username*/}
                <div className="userName">
                    <label for="userName" className="formLabel"></label>
                    <input 
                        type="text" 
                        id="userName" 
                        placeholder="Pseudo" 
                        onChange={(e)=>setPseudo(e.target.value)}
                        value={username}
                        required
                    >
                    </input>
                </div>
                {/*password*/}
                <div className="passwordCreation">
                    <label for="password" className="formLabel"></label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Créer mot de passe" 
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password} 
                        required
                    >
                    </input>
                </div>
                <div className="signUp_password_error"></div>
                <div className="passwordConfirmation">
                    <label for="password" className="formLabel"></label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Confirmer mot de passe" 
                        onChange={(e)=>setPasswordConfirm(e.target.value)}
                        value={passwordConfirm} 
                        required
                    >
                    </input>
                </div>
                <div className="signUp_password_confirmation_error"></div>                    
                <button type="submit" className="signUpButton">S'enregistrer</button>  
            </form>
    )
};

export default SignUp;