import React from 'react';
import {FaTrashAlt} from "react-icons/fa"

const CommentCard = (props) => {
    return (
        <li className="oneComment">
            <div>{props.comment.comment_content}</div>
            <span className="comment_delete_icon"><FaTrashAlt/></span>
        </li>
    );
};

export default CommentCard;