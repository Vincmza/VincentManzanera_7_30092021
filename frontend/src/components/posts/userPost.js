import React, { useState, useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { MdOutlineImage } from "react-icons/md";
import axios from "axios";
import "./userPost.css";

const UserPost = (props) => {
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    const [connectedUserInfos, setConnectedUserInfos] = useState([]);

    useEffect(async () => {
        /*user connected pseudo*/
        axios({
            method: "get",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            url: `http://localhost:8081/api/user/${user.userId}`,
            withCredentials: true,
        })
            .then((userInfos) => {
                setConnectedUserInfos(userInfos.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div className="connected_user_pseudo">
                <span className="user_icon">
                    <BiUser />
                </span>
                <span className="form_post_user_pseudo">{connectedUserInfos.username}</span>
            </div>
            <form className="create_post">
                <div className="user_post_title">
                    <label for="user_post_title"></label>
                    <input
                        id="user_post_title"
                        type="text"
                        minLength="1"
                        maxLength="50"
                        aria-describedby="post_title"
                        placeholder="Titre de votre post"
                        required
                    ></input>
                </div>
                <div className="text_post">
                    <label for="user_post"></label>
                    <textarea
                        id="user_post"
                        name="user_post"
                        aria-describedby="user_story"
                        minLength="1"
                        maxLength="1600"
                        sentences
                        autoFocus
                        required
                        placeholder="Exprimez-vous..."
                    ></textarea>
                    <div className="put_user_image"></div>
                </div>
                <div className="form_footer">
                    <button className="img_post" type="submit">
                        <a href="#" title="Ajouter une image"><MdOutlineImage /></a>
                    </button>
                    <button className="send_user_post" type="submit">
                        Envoyer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserPost;
