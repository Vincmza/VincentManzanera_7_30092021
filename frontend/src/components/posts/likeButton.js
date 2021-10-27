import React from "react";
import { AiOutlineLike} from "react-icons/ai";


const Like = (props) => {
 
    return (
        <div className="like_container">
            <div className="like_and_unlike">
                <AiOutlineLike/>
            </div>
        </div>
    );
};

export default Like;
