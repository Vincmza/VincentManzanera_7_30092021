//Libraries
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../../images/header_logo.png";
import axios from "axios";
import "./header.css";

function Header(props) {
    /*if top right icon clicked so display user infos pannel*/
    const [iconClicked, setIconClicked] = useState(false);
    /*Storing connected user infos*/
    const [userData, setUserData] = useState([]);
    const userInfosPannel = document.querySelector(".head__nav");

    const handleIcon = () => {
        setIconClicked(!iconClicked);
    };
    const logOut = () => {
        localStorage.clear();
        userInfosPannel.innerHTML = "";
    };  
    useEffect(() => {

        /*Get data from localstorage about connected user*/

        if (localStorage.getItem("connectedUser") != null) {
            const user = JSON.parse(localStorage.getItem("connectedUser"));
            const token = user.token

             /*Get user data from API*/
            const getInfos = async () => {
                axios({
                    method: "get",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                    url: `http://localhost:8081/api/users/${user.userId}`,
                    withCredentials: true,
                })
                    .then((userData) => {
                        setUserData(userData.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
            getInfos();
        }
    }, []);
    /*Return Header including connected user infos*/
    return (
        <header className="head">
            <div className="head__logo">
                <NavLink exact to="/">
                    <img src={logo} alt="logo" />
                </NavLink>
            </div>
            <nav className="head__nav">
                <div className="set_username">{userData.username}</div>
                <button className="head__nav-user" type="button" onClick={handleIcon}>
                    <span className="userIcon">
                        <FaUserCircle />
                    </span>
                </button>

                {iconClicked ? (
                    <div className="userInfos">
                        <p className="user_username">
                            <span className="user_infos_title">Pseudo :</span> <br />
                            {userData.username}
                        </p>
                        <p className="used_email">
                            <span className="user_infos_title">Votre email :</span> {userData.email}
                        </p>
                        <p className="logout">
                            <span className="user_infos_title">Déconnexion</span> <br />
                            <NavLink exact to="/profile">
                                <span className="logout_logo" onClick={logOut}>
                                    <FaSignOutAlt />
                                </span>
                            </NavLink>
                        </p>
                    </div>
                ) : (
                    <div></div>
                )}
            </nav>
        </header>
    );
}

export default Header;
