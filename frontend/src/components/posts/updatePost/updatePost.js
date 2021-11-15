import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { BsArrowLeftSquareFill, BsTrash } from "react-icons/bs";
import axios from "axios";
import "./updatePost.css";

const UpdatePost = () => {
    const history = useHistory();
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*stored post id*/
    let { postId } = useParams();
    /*Getting back connected user data in order to display username*/
    const [connectedUserInfos, setConnectedUserInfos] = useState([]);
    /*Required informations to add a new post*/
    const [updatedPostTitle, setUpdatedPostTitle] = useState("");
    const [updatedPostContent, setUpdatedPostContent] = useState("");
    const [updatedPostImage, setUpdatedPostImage] = useState("");
    /*stored update post form*/
    const updatePostForm = document.getElementById("update_post_form");
    /*handling errors*/
    const postTitleError = document.querySelector(".error_post_title");
    const postContentError = document.querySelector(".error_post_content");

    useEffect(async () => {
        /*get user connected pseudo*/
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

    useEffect(async () => {
        /*get current post data*/
        axios({
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/posts/${postId}`,
            withCredentials: true,
        })
            .then((currentPost) => {
                setUpdatedPostImage(currentPost.data.imageUrl);
                setUpdatedPostContent(currentPost.data.post_content);
                setUpdatedPostTitle(currentPost.data.post_title);
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
                setUpdatedPostImage(e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    /*delete image preview from the input*/
    const clearImage = () => {
        const inputImage = document.getElementById("new_post_image");
        setUpdatedPostImage(null);
        inputImage.value = null;
    }

        /*Function to update an existing post*/
        const handleUpdatedPost = async (e) => {
            e.preventDefault();
            const inputImage = document.getElementById("new_post_image");
            if (updatePostForm.reportValidity()) {
                /*Storing data including image before Post request*/
                let bodyFormData = new FormData();
                bodyFormData.append("updatedPostTitle", updatedPostTitle);
                bodyFormData.append("updatedPostContent", updatedPostContent);
                bodyFormData.append("postImage", inputImage.files ? inputImage.files[0] : null);
                axios({
                    method: "put",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    url: process.env.REACT_APP_API_URL+`api/posts/update-post/${postId}`,
                    withCredentials: true,
                    data: bodyFormData,
                })
                    .then((updatedPost) => {
                        console.log(updatedPost);
                        history.push(`/posts/${postId}`);
                    })
                    .catch((error) => {
                        console.log(error);
                        if (
                            error.response.data ==
                            "La mise à jour du post ne contient ni titre ni contenu"
                        ) {
                            postTitleError.innerHTML = `<p>Votre post ne contient pas de titre</p>`;
                            postContentError.innerHTML = `<p>Votre post n'a pas de contenu</p>`;
                        }
                        if (
                            error.response.data == "La mise à jour du post ne contient aucun titre"
                        ) {
                            postTitleError.innerHTML = `<p>Votre post ne contient pas de titre</p>`;
                        }
                        if (
                            error.response.data ==
                            "La mise à jour du post ne contient aucun contenu"
                        ) {
                            postContentError.innerHTML = `<p>Votre post n'a pas de contenu</p>`;
                        }
                    });
            }
        };
        return (
            <div>
                <div className="updated_post">
                    <div className="previous_button" title="Retour sur le post">
                        <Link to={`/posts/${postId}`}>
                            <BsArrowLeftSquareFill />
                        </Link>
                    </div>
                    <div className="connected_user_pseudo">
                        <span className="user_icon">
                            <BiUser />
                        </span>
                        <span className="updated_post_user_pseudo">
                            {connectedUserInfos.username}
                        </span>
                    </div>
                    <div className="new_post-error"></div>
                    <form className="update_post" id="update_post_form">
                        <div className="updated_post_title">
                            <label for="updated_post_title"></label>
                            <input
                                id="updated_post_title"
                                type="text"
                                minLength="1"
                                maxLength="50"
                                aria-describedby="post_title"
                                onChange={(e) => setUpdatedPostTitle(e.target.value)}
                                value={updatedPostTitle}
                                placeholder="Actualisez le titre de votre post"
                                required
                            ></input>
                        </div>
                        <div className="error_post_title"></div>
                        <div className="updated_post_content">
                            <label for="updated_post"></label>
                            <textarea
                                id="updated_post_content"
                                name="user_post"
                                aria-describedby="user_story"
                                minLength="1"
                                maxLength="1600"
                                sentences
                                autoFocus
                                onChange={(e) => setUpdatedPostContent(e.target.value)}
                                value={updatedPostContent}
                                placeholder="Actualisez le contenu de votre post"
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
                                <img src={updatedPostImage} id="preview" alt="" />
                                <div title="Supprimer l'image" className="delete_image">
                                    <BsTrash onClick={clearImage} />
                                </div>
                            </div>
                        </div>
                        <div className="form_footer">
                            <button
                                className="send_user_post"
                                type="submit"
                                onClick={handleUpdatedPost}
                            >
                                Publier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

export default UpdatePost;
