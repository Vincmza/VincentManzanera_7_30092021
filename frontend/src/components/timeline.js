import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./posts/card";

const Timeline = () => {
    const [allPosts, setAllposts] = useState([]);
    const user = JSON.parse(localStorage.getItem("userData"));
    const token = user.token;
    console.log("salut !");

    useEffect(async () => {
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
