import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import axios from "axios";

const Like = (props) => {
    /*Get connected user data from local storage*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*if user likes = true*/
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (props.post.listLikes.likes_user_id == user.userId) {
            setLiked(true);
        }
    }, []);

    const like_post = () => {
        if (props.post.listLikes.likes_user_id != user.userId) {
            axios({
                method: "post",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                url: `http://localhost:8081/api/likes/like-post/${props.post.post_id}`,
                withCredentials: true,
                data: {
                    id: user.userId,
                    liked_post: true,
                },
            })
                .then((res) => {
                    setLiked(true);
                    res.status(200).json("Requête like-post réussie !");
                    
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const unlike_post = () => {
        if(props.post.listLikes.likes_user_id == user.userId){
            axios({
                method: "delete",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                url: `http://localhost:8081/api/likes/unlike-post/${props.post.listLikes.id}`,
                withCredentials: true,
                data: {
                    id: user.userId                
                },
            })
                .then((res) => {
                    setLiked(false);
                    res.status(200).json("Requête unlike-post réussie !");
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        
    };

    return (
        <div className="like_container">
            <div className="like_and_unlike">
                {user && liked == false && <AiOutlineLike onClick={like_post} />}
                {user && liked && <AiFillLike onClick={unlike_post} />}
            </div>
        </div>
    );
};

export default Like;
