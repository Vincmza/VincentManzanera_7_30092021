import {BiUser, BiLike, BiDislike} from "react-icons/bi";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import "./card.css";

const Card = (posts) => {
    /*Hook displaying loading logo if data retrieve is too long*/
    const [isLoading, setIsLoading] = useState(true);

    /*Storing userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;

    /*Storing all informations about all users*/
    const [allUsers, setAllUsers]=useState([]);

    useEffect(() => {
        if (posts != null) {
            setIsLoading(false);
        }
    }, []);

    useEffect(()=>{

        /*Get request to get back all informations about all users*/

        axios ({
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: "http://localhost:8081/api/user",
            withCredentials: true,
        })
        .then((users)=>{
            setAllUsers(users.data)
            localStorage.setItem("allUsers", JSON.stringify(users.data));

        })
        .catch((error)=>{
            console.log(error)
        })

    }, [])
    console.log(allUsers)

    return (
        <li className="card_container" key={posts.post.post_id}>
            {isLoading ? <FaSpinner /> : 
            
            <>
            <div className="post_header">
                <div className="user_icon">
                    <BiUser/>
                </div>
                <div className="user_pseudo">
                    
                </div>
            </div>
            <div className="post_body">
                <div className="post_title">
                    {posts.post.title}
                </div>
                <div className="post_content">
                    {posts.post.content_post}
                </div>
            </div>
            <div>
                <button className="like_post" type="submit">
                    <BiLike/>
                </button>
                <button className="dislike_post" type="submit">
                    <BiDislike/>
                </button>
            </div>
                        
            </>}
        </li>
    );
};

export default Card;
