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
    console.log(req.body)
    connection
        .query("UPDATE likes SET liked = ? WHERE post_id = ?", [req.body.liked_post, req.params["postId"]])
        .then((unlike_post) => {
            console.log(unlike_post)
            res.status(200).json(unlike_post);
        })
        .catch((error) => {
            res.status(400).json(error)
            console.log(error);
        });
};

/*dislike and undislike*/

exports.dislike_post = (req, res) => {
    console.log(req.body)
    connection
        .query("INSERT INTO likes (user_id, disliked, post_id) VALUES (?, ?, ?)", [req.body.id, req.body.disliked_post, req.params["postId"]])
        .then((dislike_post) => {
            res.status(200).json(dislike_post);
        })
        .catch((error) => {
            res.status(400).json(error)
        });
};

exports.undislike_post = (req, res) => {
    console.log(req.body)
    connection
        .query("UPDATE likes SET disliked = ? WHERE post_id = ?", [req.body.disliked_post, req.params["postId"]])
        .then((undislike_post) => {
            console.log(undislike_post)
            res.status(200).json(undislike_post);
        })
        .catch((error) => {
            res.status(400).json(error)
            console.log(error);
        });
};

