import React, { useEffect, useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import axios from "axios";

const Like = (posts) => {
    console.log(posts)
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    const [liked, setLiked] = useState(false);
    
    useEffect(() => {
        if (posts.post.post.listLikes.likes_user_id == user.userId) {
            setLiked(true);
        }
    }, []);

    const like = () => {
        axios({
            method: "post",
            headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/likes/like-post/${posts.post.post.post_id}`,
            withCredentials: true,
            data: {
                id: user.userId,
                liked_post: true
            }
        })
            .then((res) => {
                setLiked(true)
                res.status(200).json("Requête post réussie !")
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const unlike = () => {};
    return (
        <div className="like_container">
            {user && liked == false && <BiLike onClick={like} />}
            {user && liked && <BiLike onClick={unlike} />}
        </div>
    );
};

export default Like;
