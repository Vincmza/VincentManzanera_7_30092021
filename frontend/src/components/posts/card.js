import React, { useEffect, useState } from 'react';
import { FaSpinner } from "react-icons/fa";

const Card = (posts) => {
    const [isLoading, setIsLoading]=useState(true);

    useEffect(()=>{

        if(posts != null){
            setIsLoading(false)
        }
    })

    return (
        <li className="card_container" key={posts.post_id}>
            {isLoading ? (
                <FaSpinner/>
            ) : (
                <h3>test</h3>
            )}
        </li>
    );
};

export default Card;