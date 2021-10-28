import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";


const NewComment = () => {
    let {postId} = useParams();
     /*Getting back userId and token*/
     const user = JSON.parse(localStorage.getItem("connectedUser"));
     const token = user.token;
     /*Stored form data*/
     const[newCommentContent, setNewCommentContent]=useState("")
     const handleNewComment = async (e)=>{
         e.preventDefault();
         axios({
            method: "post",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/commentaires/${postId}`,
            withCredentials: true,
            data: {
                newCommentContent,
                user_id : user.userId
            }
         })
         .then((newComment)=>{
            console.log(newComment)            
            window.location.reload()

         })
         .catch((error)=>{
             console.log(error)
         })
     }
    return (
        <div>
            <form className="create_comment">
                <div className="comment_content">
                    <label for="comment_content"></label>
                    <textarea
                        id="comment_content"
                        type="text"
                        minLength="1"
                        maxLength="1600"
                        aria-describedby="comment_content"
                        onChange={(e)=>setNewCommentContent(e.target.value)}
                        value={newCommentContent}
                        placeholder="Rédigez votre commentaire"
                        required
                    >
                    </textarea>
                </div>
                <button className="send_user_comment" type="submit" onClick={handleNewComment}>Publier</button>
            </form>
        </div>
    );
};

export default NewComment;
