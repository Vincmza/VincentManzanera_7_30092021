import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./posts/card";
import UserPost from "./posts/userPost.js";


const Timeline = () => {
    /*Storing all posts and related comments*/
    const [allPosts, setAllposts] = useState([]);
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;

    useEffect(async () => {
        /*Getting back all posts and related comments*/
        axios({
            method: "get",
            headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` },
            url: "http://localhost:8081/api/posts",
            withCredentials: true,
        })
            .then((posts) => {
                setAllposts(posts.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="timeline_container">
            <div className="user_post_container">
                <UserPost/>
            </div>
            <ul>
                {allPosts.map((post) => {
                    return <Card post={post} key={post.post_id} />;
                })}
            </ul>
        </div>
    );
};

export default Timeline;
