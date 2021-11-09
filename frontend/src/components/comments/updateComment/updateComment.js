import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";
import {BsArrowLeftSquareFill} from "react-icons/bs"
import "./updateComment.css";

const UpdateComment = () => {
    const history = useHistory();
    let { commentId } = useParams();
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*Stored form data*/
    const [updateCommentContent, setUpdateCommentContent] = useState("");
    const [comment, setComment] = useState([]);

    useEffect (()=>{
        axios({
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/commentaires/get-one-comment/${commentId}`,
            withCredentials: true,
        })
            .then((comment) => {
                console.log(comment) 
                setComment(comment.data);
                setUpdateCommentContent(comment.data.content_comment)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    console.log(updateCommentContent)   
    const handleUpdateComment = async (e) => {
        e.preventDefault();
        axios({
            method: "put",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/commentaires/${commentId}`,
            withCredentials: true,
            data: {
                updateCommentContent,
            },
        })
            .then((updatedComment) => {
                history.push(`/posts/${comment.post_id}`);
                console.log(updatedComment);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div>
            <form className="update_comment">
                <div className="back_button" title="Retour sur le post">
                   <Link to={`/posts/${comment.post_id}`}><BsArrowLeftSquareFill/></Link>
                </div>
                <div className="comment_updated">
                    <label for="comment_updated"></label>
                    <textarea
                        id="comment_updated"
                        name="comment_updated"
                        type="text"
                        minLength="1"
                        maxLength="1600"
                        aria-describedby="comment_content"
                        onChange={(e) => setUpdateCommentContent(e.target.value)}
                        value={updateCommentContent}
                        placeholder="Actualisez votre commentaire"
                        required
                    ></textarea>
                </div>
                <button
                    className="send_updated_comment"
                    type="submit"
                    onClick={handleUpdateComment}
                >
                    Publier
                </button>
            </form>
        </div>
    );
};

export default UpdateComment;
