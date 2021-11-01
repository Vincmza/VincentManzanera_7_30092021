import React from 'react';
import Timeline from "../components/timeline"
import Profile from "../pages/profile"
const Home = () => {
    const user = JSON.parse(localStorage.getItem("connectedUser"));
    const direction = ()=>{
        if(user != null) {
            return <Timeline/>
        }
        else {
            return <Profile/>
        }        
    }
    return (
        <div className="main">
            {direction()}
        </div>
    );
}

export default Home;