import React, { useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { MdOutlineImage } from "react-icons/md";
import axios from "axios";
import "./userPost.css";

const UserPost = (props) => {
    const history = useHistory()
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*Getting back connected user data in order to display username*/
    const [connectedUserInfos, setConnectedUserInfos] = useState([]);
    /*Required informations to add a new post*/
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
   
    // const [newPostImage, setNewPostImage]=useState(false);

    useEffect(async () => {
        /*user connected pseudo*/
        axios({
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/users/${user.userId}`,
            withCredentials: true,
        })
            .then((userInfos) => {
                setConnectedUserInfos(userInfos.data);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(connectedUserInfos)

    /*Function to add a new post*/
    const handleNewPost = async (e) => {
        e.preventDefault();
        axios({
            method: "post",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/posts/${user.userId}`,
            withCredentials: true,
            data: {
                newPostTitle,
                newPostContent,
            },
        })
            .then((newPost) => {
                console.log(newPost);
                history.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div>
            <div className="connected_user_pseudo">
                <span className="user_icon">
                    <BiUser />
                </span>
                <span className="new_post_user_pseudo">{connectedUserInfos.username}</span>
            </div>
            <div className="new_post-error"></div>
            <form className="create_post">
                <div className="new_post_title">
                    <label for="new_post_title"></label>
                    <input
                        id="new_post_title"
                        type="text"
                        minLength="1"
                        maxLength="50"
                        aria-describedby="post_title"
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        value={newPostTitle}
                        placeholder="Titre de votre post"
                        required
                    ></input>
                </div>
                <div className="new_post_content">
                    <label for="user_post"></label>
                    <textarea
                        id="user_post"
                        name="user_post"
                        aria-describedby="user_story"
                        minLength="1"
                        maxLength="1600"
                        sentences
                        autoFocus
                        onChange={(e) => setNewPostContent(e.target.value)}
                        value={newPostContent}
                        placeholder="Exprimez-vous..."
                        required
                    ></textarea>
                    <div className="new_post_image"></div>
                </div>
                <div className="form_footer">
                    <button className="add_img_button" type="submit">
                        <a href="#" title="Ajouter une image">
                            <MdOutlineImage />
                        </a>
                    </button>                   
                        <button className="send_user_post" type="submit" onClick={handleNewPost}>
                            Publier
                        </button>                 
                </div>
            </form>
        </div>
    );
};

export default UserPost;
