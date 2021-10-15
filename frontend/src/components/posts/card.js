import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Card = (posts) => {
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("userData"));
    const token = user.token;
    const [allUsers, setAllUsers]=useState([]);

    useEffect(() => {
        if (posts != null) {
            setIsLoading(false);
        }
    }, []);

    useEffect(()=>{
        axios ({
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: "http://localhost:8081/api/user",
            withCredentials: true,
        })
        .then((users)=>{
            setAllUsers(users.data)
        })
        .catch((error)=>{
            console.log(error)
        })

    }, [])
    console.log(allUsers)

    return (
        <li className="card_container" key={posts.post_id}>
            {isLoading ? <FaSpinner /> : <h3>test</h3>}
        </li>
    );
};

export default Card;
