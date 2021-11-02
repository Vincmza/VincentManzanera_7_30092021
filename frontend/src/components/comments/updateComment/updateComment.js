import React, {useState} from "react";
import axios from "axios";
import "./updateComment.css"


const UpdateComment = (props) => {
     /*Getting back userId and token*/
     const user = JSON.parse(localStorage.getItem("connectedUser"));
     const token = user.token;
     /*Stored form data*/
     const[updateCommentContent, setUpdateCommentContent]=useState("")

     const handleUpdateComment = async (e)=>{
         e.preventDefault();
         axios({
            method: "put",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/commentaires/${props.comment.comment_id}`,
            withCredentials: true,
            data: {
                updateCommentContent,
            }
         })
         .then((updatedComment)=>{
            console.log(updatedComment)          
         })
         .catch((error)=>{
             console.log(error)
         })
     }
    return (
        <div>
            <form className="update_comment">
                <div className="comment_updated">
                    <label for="comment_updated"></label>
                    <textarea
                        id="comment_updated"
                        type="text"
                        minLength="1"
                        maxLength="1600"
                        aria-describedby="comment_content"
                        onChange={(e)=>setUpdateCommentContent(e.target.value)}
                        value={updateCommentContent}
                        placeholder="Actualisez votre commentaire"
                        required
                    >
                    </textarea>
                </div>
                <button className="send_updated_comment" type="submit" onClick={handleUpdateComment}>Publier</button>
            </form>
        </div>
    );
};

export default UpdateComment;
