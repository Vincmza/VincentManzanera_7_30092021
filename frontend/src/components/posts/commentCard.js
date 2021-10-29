import React from 'react'
import {FaTrashAlt} from "react-icons/fa"
import axios from "axios"

const CommentCard = (props) => {
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;

    const handleDeleteComment = ((e)=>{
        e.preventDefault()
        axios({
            method: "delete",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/commentaires/${props.comment.comment_id}`,
            withCredentials: true,
        })
        .then((res)=>{
            window.location.reload()
            console.log(res)
        })
        .catch((error)=>{
            
            console.log(error)
        })
    })
    const userVerify = ()=>{
        if(user.userId == props.comment.comment_user_id){
            return <FaTrashAlt onClick={handleDeleteComment}/>
        }
    }
    return (
        <li className="comment-container">
            <div className="comment_username">{props.comment.comment_username}</div>
            <div className="oneComment">
                <div className="comment_content">{props.comment.comment_content}</div>
                <span className="comment_delete_icon">{userVerify()}</span>
            </div>
        </li>
    );
};

export default CommentCard;