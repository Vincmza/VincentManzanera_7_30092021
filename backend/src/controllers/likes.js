const connection = require('../service/database');

exports.getUserLike = (req, res) =>{
    connection
        .query("SELECT * FROM likes WHERE post_id = ? AND user_id = ?", [req.params["postId"], req.userId])
        .then((userLike)=>{
            res.status(200).json(userLike[0])
        })
        .catch((error)=>{
            res.status(400).json(error)
        })
}

exports.like_post = (req, res) => {
    connection
        .query("INSERT INTO likes (user_id, liked, post_id) VALUES (?, ?, ?)", [req.userId, req.body.liked, req.params["postId"]])
        .then((like_post) => {
            res.status(200).json(like_post);
        })
        .catch((error) => {
            res.status(400).json(error)
        });
};

exports.unlike_post = (req, res) => {
    connection
        .query("DELETE from likes WHERE id = ? AND user_id = ?", [req.params["likeId"], req.userId])
        .then((unlike_post) => {
            console.log(unlike_post)
            res.status(200).json(unlike_post);
        })
        .catch((error) => {
            res.status(400).json(error)
            console.log(error);
        });
};



