import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike} from "react-icons/ai";
import axios from "axios";

const Like = (props) => {
    let postId = props.postId
    /*Getting back userId and token*/
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const token = user.token;
    /*false = unlike, true = like*/
    const [likeState, setLikeState]=useState(false);
    /*stored connected user like in relation to that post*/
    const [userLike, setUserLike]=useState([]);

    useEffect(async ()=>{
        axios({
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            url: process.env.REACT_APP_API_URL+`api/likes/${postId}`,
            withCredentials: true
        })
        .then((userLike)=>{
            setUserLike(userLike.data)
            if(userLike.data != false){
                setLikeState(true)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])

    const like_post = (e)=>{
        e.preventDefault()
        if(!userLike){
            axios({
                method: "post",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                url: process.env.REACT_APP_API_URL+`api/likes/like-post/${postId}`,
                withCredentials: true,
                data : { liked : true}
            })
            .then((likesArray)=>{
                console.log(likesArray)
                window.location.reload()                
            })
            .catch((error)=>{
                console.log(error)
            })        
        }                    
    }
    const unlike_post = (e)=>{
        e.preventDefault()
        if(userLike){
            axios({
                method: "delete",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                url: process.env.REACT_APP_API_URL+`api/likes/unlike-post/${userLike.id}`,
                withCredentials: true
            })
            .then((likesArray)=>{
                console.log(likesArray)
                window.location.reload()               
            })
            .catch((error)=>{
                console.log(error)
            })        
        }      
    }
    const likeIcon = ()=>{
        if(likeState == false){
            return <AiOutlineLike onClick={like_post}/>
        } else {
            return <AiFillLike onClick={unlike_post}/>
        }
    }
    return (
        <div className="like_container">
            <div className="like_and_unlike"> 
                {likeIcon()}     
            </div>
        </div>
    );
};


export default Like;
