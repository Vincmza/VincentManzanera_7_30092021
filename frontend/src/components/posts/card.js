import {BiUser, BiLike, BiDislike} from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { FaSpinner, FaRegComment } from "react-icons/fa";
import Like from "./likeButton";
import "./card.css";

const Card = (posts) => {
    /*Hook displaying loading logo if data retrieve is too long*/
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (posts != null) {
            setIsLoading(false);
        }
    }, []);

    console.log(posts)

    return (
        <li className="card_container" key={posts.post.post_id}>
            {isLoading ? <FaSpinner /> : 
            
            <>
            <div className="post_header">
                <div className="user_icon">
                    <BiUser/>
                </div>
                <div className="user_pseudo">
                    {posts.post.username}
                </div>
            </div>
            <div className="post_body">
                <div className="post_title">
                    {posts.post.post_title}
                </div>
                <div className="post_content">
                    {posts.post.post_content}
                </div>
            </div>
            <div className="like_and_dislike_buttons">
                <button className="like_post" type="submit">
                    <Like post={posts}/>
                    <BiLike/>
                </button>
                <button className="dislike_post" type="submit">
                    <BiDislike/>
                </button>
            </div>
            <div className="comment_section">
                <div className="comment_icon">
                    <FaRegComment/>
                </div>
                <span className="comment_numbers">
                    {posts.post.listComment.length}
                </span>
            </div>                       
            </>}
        </li>
    );
};

export default Card;
