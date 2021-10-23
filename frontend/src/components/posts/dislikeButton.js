import {React, useEffect, useState } from "react";
import {AiOutlineDislike, AiFillDislike} from "react-icons/ai";
import axios from "axios";

const Dislike = (posts) => {
    /*get connected user data from local storage*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*if user dislikes = true*/
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        if (posts.post.listLikes.likes_user_id == user.userId) {
            setDisliked(true);
        }
    }, []);

    const dislike_post = () => {

        if(posts.post.listLikes.liked_post == null){

            axios({
                method: "post",
                headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` },
                url: `http://localhost:8081/api/likes/like-post/${posts.post.post_id}`,
                withCredentials: true,
                data: {
                    id: user.userId,
                    disliked_post: true
                }
            })
                .then((res) => {
                    setDisliked(true)
                    res.status(200).json("Requête like-post réussie !")
                    console.log(res)
                })
                .catch((error) => {
                    console.log(error)
                });

        }      
    };

    const undislike_post = () => {

        axios({
            method: "put",
            headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` },
            url: `http://localhost:8081/api/likes/unlike-post/${posts.post.post_id}`,
            withCredentials: true,
            data: {
                id: user.userId,
                disliked_post: false
            }
        })
            .then((res) => {
                setDisliked(false)
                res.status(200).json("Requête unlike-post réussie !")
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            });
   
    };    
    return (
        <div>
            <div className="dislike_container">
                <div className="dislike_and_undislike">
                {user && disliked == false && <AiOutlineDislike onClick={dislike_post} />}
                {user && disliked && <AiFillDislike onClick={undislike_post} />}
                </div>
                <span></span>          
            </div>           
        </div>
    );
};

export default Dislike;