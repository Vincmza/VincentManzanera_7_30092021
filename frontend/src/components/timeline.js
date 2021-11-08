import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./posts/card";
import "./timeline.css"

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
            url: process.env.REACT_APP_API_URL+"api/posts",
            withCredentials: true,
        })
            .then((posts) => {
                setAllposts(posts.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(allPosts)
    return (
        <div className="timeline_container">
           <span className="create_post_direction"><Link to="/new-post">Créer un post</Link></span>
            <ul>
                {allPosts.map((post) => {
                    return <Card post={post} key={post.post_id} />;
                })}
            </ul>
        </div>
    );
};

export default Timeline;
