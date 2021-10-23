const connection = require('../service/database');

/* like and unlike*/

exports.like_post = (req, res) => {
    console.log(req.body)
    connection
        .query("INSERT INTO likes (user_id, liked, post_id) VALUES (?, ?, ?)", [req.body.id, req.body.liked_post, req.params["postId"]])
        .then((like_post) => {
            res.status(200).json(like_post);
        })
        .catch((error) => {
            res.status(400).json(error)
        });
};

exports.unlike_post = (req, res) => {
    connection
        .query("DELETE from likes WHERE id = ?", [req.params["likeId"]])
        .then((unlike_post) => {
            console.log(unlike_post)
            res.status(200).json(unlike_post);
        })
        .catch((error) => {
            res.status(400).json(error)
            console.log(error);
        });
};



