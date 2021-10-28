import React from 'react'
import {FaTrashAlt} from "react-icons/fa"

const CommentCard = (props) => {
    
    return (
        <li>
            <div>{props.comment.comment_username}</div>
            <div className="oneComment">
                <div>{props.comment.comment_content}</div>
                <span className="comment_delete_icon"><FaTrashAlt/></span>
            </div>
        </li>
    );
};

export default CommentCard;