import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./posts/card";

const Timeline = () => {
    /*Storing all posts and related comments*/
    const [allPosts, setAllposts] = useState([]);
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    console.log("salut !");

    useEffect(async () => {

        /*Getting back all posts and related comments*/

        axios({
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
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
    console.log(allPosts);

    return (
        <div className="timeline_container">
            <ul>
                {allPosts.map((posts) => {
                    return <Card post={posts} key={posts.post_id} />;
                })}
            </ul>
        </div>
    );
};

export default Timeline;
