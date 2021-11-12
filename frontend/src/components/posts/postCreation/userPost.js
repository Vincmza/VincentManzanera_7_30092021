import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import "./userPost.css";

const UserPost = (props) => {
    const history = useHistory();
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*handling errors*/
    const postTitleError = document.querySelector(".error_post_title");
    const postContentError = document.querySelector(".error_post_content");
    const postCreationForm = document.getElementById("create_post");
    /*Getting back connected user data in order to display username*/
    const [connectedUserInfos, setConnectedUserInfos] = useState([]);
    /*Required informations to add a new post*/
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    /*State in relation to img preview*/
    const [newPostImage, setNewPostImage] = useState("");

    useEffect(async () => {
        /*user connected pseudo*/
        axios({
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/users/connected-user`,
            withCredentials: true,
        })
            .then((userInfos) => {
                setConnectedUserInfos(userInfos.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function readURL(e) {
        const input = e.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setNewPostImage(e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    /*delete image preview from the input*/
    const clearImage = () => {
        const inputImage = document.getElementById("new_post_image");
        setNewPostImage(null);
        inputImage.value = null;
    };
    /*Function to add a new post*/
    const handleNewPost = async (e) => {
        e.preventDefault();
        const inputImage = document.getElementById("new_post_image");
        if (postCreationForm.reportValidity()) {
            /*Storing data including image before Post request*/
            let bodyFormData = new FormData();
            bodyFormData.append("postTitle", newPostTitle);
            bodyFormData.append("postContent", newPostContent);
            bodyFormData.append("postImage", inputImage.files ? inputImage.files[0] : null);
            axios({
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                url: `http://localhost:8081/api/posts/create-post`,
                withCredentials: true,
                data: bodyFormData,
            })
                .then((newPost) => {
                    console.log(newPost);
                    history.push("/");
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data == "Ce post ne contient ni titre ni contenu") {
                        postTitleError.innerHTML = `<p>Ce post doit contenir un titre</p>`;
                        postContentError.innerHTML = `<p>Ce post doit avoir du contenu</p>`;
                    }
                    if (error.response.data == "Ce post n'a pas de titre") {
                        postTitleError.innerHTML = `<p>Ce post doit contenir un titre</p>`;
                    }
                    if (error.response.data == "Ce post n'a pas de contenu") {
                        postContentError.innerHTML = `<p>Ce post doit avoir du contenu</p>`;
                    }
                });
        }
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
            <form className="create_post" id="create_post">
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
                <div className="error_post_title"></div>
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
                    <div className="error_post_content"></div>
                    <div className="new_post_image">
                        <label for="new_post_image"></label>
                        <input
                            id="new_post_image"
                            name="new_post_image"
                            type="file"
                            accept="image/jpeg, image/jpg, image/png"
                            onChange={readURL}
                        ></input>
                        <img src={newPostImage} id="preview" alt="" />
                        <div title="Supprimer l'image" className="delete_image">
                            <BsTrash onClick={clearImage} />
                        </div>
                    </div>
                </div>
                <div className="form_footer">
                    <button className="send_user_post" type="submit" onClick={handleNewPost}>
                        Publier
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserPost;
