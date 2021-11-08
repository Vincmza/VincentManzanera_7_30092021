import React, { useState, useEffect} from "react";
import {useParams, useHistory, Link} from "react-router-dom";
import { BiUser } from "react-icons/bi";
import {BsArrowLeftSquareFill} from "react-icons/bs"
import { MdOutlineImage } from "react-icons/md";
import axios from "axios";
import "./updatePost.css"

const UpdatePost = () => {
    const history = useHistory();
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*stored post id*/
    let {postId} = useParams()
    /*Getting back connected user data in order to display username*/
    const [connectedUserInfos, setConnectedUserInfos] = useState([]);
    /*data about current post*/
    const[currentPost, setCurrentPost]=useState([]);
    /*Required informations to add a new post*/
    const [updatedPostTitle, setUpdatedPostTitle] = useState("");
    const [updatedPostContent, setUpdatedPostContent] = useState("");

    // const [newPostImage, setNewPostImage]=useState(false);

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
                setUpdatedPostContent(currentPost.data.post_content);
                setUpdatedPostTitle(currentPost.data.post_title);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    /*Function to update an existing post*/
    const handleUpdatedPost = async (e) => {
        e.preventDefault();
        axios({
            method: "put",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/posts/update-post/${postId}`,
            withCredentials: true,
            data: {
                updatedPostTitle,
                updatedPostContent,
            },
        })
            .then((updatedPost) => {
                console.log(updatedPost);
                history.push(`/posts/${postId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <div className="updated_post">
                <div className="previous_button" title="Retour sur le post">
                   <Link to={`/posts/${postId}`}><BsArrowLeftSquareFill/></Link>
                </div>
                <div className="connected_user_pseudo">
                    <span className="user_icon">
                        <BiUser />
                    </span>
                    <span className="updated_post_user_pseudo">{connectedUserInfos.username}</span>
                </div>
                <div className="new_post-error"></div>
                <form className="update_post">
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
                        <div className="new_post_image"></div>
                    </div>
                    <div className="form_footer">
                        <button className="add_img_button" type="submit">
                            <a href="#" title="Ajouter une image">
                                <MdOutlineImage />
                            </a>
                        </button>                   
                            <button className="send_user_post" type="submit" onClick={handleUpdatedPost}>
                                Publier
                            </button>                 
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;