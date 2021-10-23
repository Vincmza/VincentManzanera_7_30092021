import {BiUser} from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { FaSpinner, FaRegComment } from "react-icons/fa";
import Like from "./likeButton";
import "./card.css";

const Card = (props) => {
    /*Hook displaying loading logo if data retrieve is too long*/
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (props != null) {
            setIsLoading(false);
        }
    }, []);
    return (
        <li className="card_container" key={props.post.post_id}>
            {isLoading ? <FaSpinner /> : 
            
            <>
            <div className="post_header">
                <div className="user_icon">
                    <BiUser/>
                </div>
                <div className="user_pseudo">
                    {props.post.username}
                </div>
            </div>
            <div className="post_body">
                <div className="post_title">
                    {props.post.post_title}
                </div>
                <div className="post_content">
                    {props.post.post_content}
                </div>
            </div>            
            <div className="like_tab__button">
                <button className="like_post" type="submit">
                    <Like post={props.post}/>
                </button>
                <span className="like_number">{props.post.listLikes.length}</span>
            </div>           
            <div className="comment_section">
                <div className="comment_icon">
                    <FaRegComment/>
                </div>
                <span className="comment_numbers">
                    {props.post.listComment.length}
                </span>
            </div>                       
            </>}
        </li>
    );
};

export default Card;
