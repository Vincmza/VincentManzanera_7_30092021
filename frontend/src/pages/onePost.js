import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaRegComment, FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router";
import axios from "axios";

/*Components*/
import Like from "../components/posts/likeButton"
import CommentCard from "../components/posts/commentCard";

const OnePost = (props) => {
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*Post id stored*/
    let { postId } = useParams();
    /*Store post data*/
    const [postData, setPostData] = useState([]);
    const [likesData, setLikesData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);

    useEffect(async() => {
        axios({
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/posts/${postId}`,
            withCredentials: true,
        })
            .then((post) => {
                setPostData(post.data);
                setLikesData(post.data.likes);
                setCommentsData(post.data.comments)
                console.log(commentsData)                          
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="card_container" key={postData.post_id}>
            <div className="post_header">
                <div className="user_icon">
                    <BiUser />
                </div>
                <div className="user_pseudo">{postData.post_user_username}</div>
            </div>
            <div className="post_body">
                <div className="post_title">{postData.post_title}</div>
                <div className="post_content">{postData.post_content}</div>
            </div>
            <div className="like_tab__button">
                <button className="like_post" type="submit">
                    <Like />
                </button>
                <span className="like_number">{likesData.length}</span>
            </div>
            <div className="comment_section">
                <div className="comment_icon">
                    <FaRegComment />
                </div>
                <span className="comment_numbers">{commentsData.length}</span>
                <div className="post_delete_icon">
                    <FaTrashAlt />
                </div>
            </div>
            <ul className="display_comments">
                {commentsData.map((comment)=>{
                    return <CommentCard comment={comment} key={comment.comment_id}/>;
                })}
            </ul>
        </div>
    );
};

export default OnePost;
