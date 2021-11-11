import { BiUser } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { FaSpinner, FaRegComment, FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Like from "./likeButton";
import "./card.css";
import axios from "axios";

const Card = (props) => {
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const userRole = JSON.parse(localStorage.getItem("userRole"));
    const token = user.token;
    /*Hook displaying loading logo if data retrieve is too long*/
    const [isLoading, setIsLoading] = useState(true);

    /*function to delete a post*/
    const handleDeletePost = (e) => {
        e.preventDefault();
        axios({
            method: "delete",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/posts/${props.post.post_id}`,
            withCredentials: true
        })
            .then((res) => {
                window.location.reload();
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    /*if data takes too long to come loading icon is displayed*/
    useEffect(() => {
        if (props != null) {
            setIsLoading(false);
        }
    }, []);
    const userVerifyDelete = () => {
        if (user.userId == props.post.user_id || userRole == 2) {
            return <FaTrashAlt onClick={handleDeletePost} />;
        }
    };
    const userVerifyUpdate = () => {
        if (user.userId == props.post.user_id || userRole == 2) {
            return <Link to={`update-post/${props.post.post_id}`}><FaPencilAlt /></Link>;
        }
    };

    return (
        <li className="card_container" key={props.post.post_id}>
            {isLoading ? (
                <FaSpinner />
            ) : (
                <>
                    <Link to={`/posts/${props.post.post_id}`}>
                        {/*header of the post*/}
                        <div className="post_header">
                            <div className="user_icon">
                                <BiUser />
                            </div>
                            <div className="user_pseudo">{props.post.username}</div>
                            {/*icon to update post if connected user is the writer of the post*/}
                            <div className="update_post_container">
                                <span className="update_post_icon">{userVerifyUpdate()}</span>
                            </div>
                        </div>
                        {/*body of the post*/}
                        <div className="post_body">
                            <div className="post_title">{props.post.post_title}</div>
                            <div className="post_content">
                                <div>{props.post.post_content}</div>
                                <div className="post_image">
                                    <img src={props.post.imageUrl}/>                              
                                </div>                                
                            </div>                                                       
                        </div>
                        {/*like button and number of likes*/}
                        <div className="like_tab__button">
                            <button className="like_post" type="submit">
                                <Like postId={props.post.post_id}/>
                            </button>
                            <span className="like_number">{props.post.listLikes.length}</span>
                        </div>
                        {/*comment icon and number of comments*/}
                        <div className="comment_section">
                            <div className="comment_icon">
                                <FaRegComment />
                            </div>
                            <span className="comment_numbers">{props.post.listComment.length}</span>
                            {/*icon to delete post if connected user is the writer of this post*/}
                            <div className="post_delete_icon">{userVerifyDelete()}</div>
                        </div>
                    </Link>
                </>
            )}
        </li>
    );
};

export default Card;
