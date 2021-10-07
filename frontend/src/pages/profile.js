import React from 'react';

//components
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Connection from "../components/log/index"


const Profile = () => {
    return (
        <div>
            <Header></Header>
            
            <Connection/>
                      
            <Footer></Footer>
        </div>
    );
};

export default Profile;