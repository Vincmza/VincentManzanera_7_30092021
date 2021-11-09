import React from 'react'
import {FaTrashAlt, FaPencilAlt} from "react-icons/fa"
import axios from "axios"

/*components*/
import { Link } from 'react-router-dom';

const CommentCard = (props) => {
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*Getting back user role from local storage*/
    const userRole = JSON.parse(localStorage.getItem("userRole"));

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
    const userVerifyDelete = ()=>{
        if(user.userId == props.comment.comment_user_id || userRole == 2){
            return <FaTrashAlt onClick={handleDeleteComment}/>
        }
    }
    const userVerifyUpdate = ()=>{
        if(user.userId == props.comment.comment_user_id || userRole == 2){
            return <Link className="update_comment_icon_color" to={`/update-comment/${props.comment.comment_id}`}><FaPencilAlt/></Link>
        }
    }
    return (
        <li className="comment-container">
            <div className="comment-container_settings">
                <div className="comment_username">{props.comment.comment_username}</div>
                <span className="comment_update_icon">{userVerifyUpdate()}</span>
            </div>
            <div className="oneComment">
                <div className="comment_content">{props.comment.comment_content}</div>
                <span className="comment_delete_icon">{userVerifyDelete()}</span>
            </div>
        </li>
    );
};

export default CommentCard;