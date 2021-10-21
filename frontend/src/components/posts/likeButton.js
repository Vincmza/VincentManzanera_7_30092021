import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike} from "react-icons/ai";
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

    const like_post = () => {
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
                res.status(200).json("Requête like-post réussie !")
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const unlike_post = () => {

        axios({
            method: "put",
            headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/likes/unlike-post/${posts.post.post.post_id}`,
            withCredentials: true,
            data: {
                id: user.userId,
                liked_post: false
            }
        })
            .then((res) => {
                setLiked(false)
                res.status(200).json("Requête unlike-post réussie !")
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            });
   
    };
    return (
        <div className="like_container">
            {user && liked == false && <AiOutlineLike onClick={like_post} />}
            {user && liked && <AiFillLike onClick={unlike_post} />}
        </div>
    );
};

export default Like;
