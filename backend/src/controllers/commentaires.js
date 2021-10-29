const connection = require('../service/database');

exports.createComment = (req, res) => {
    connection
        .query("INSERT INTO commentaires (content_comment, user_id, post_id) VALUES (?,?,?)", [req.body.newCommentContent, req.userId, req.params["postId"]])
        .then((comment) => {
            res.status(201).json(comment);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

exports.modifyComment = (req, res) => {
    connection
        .query("UPDATE commentaires SET ? WHERE id = ?", [req.body, req.params['commentId']])
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.deleteComment = (req, res) => {
    console.log(req.userId)
    connection
        .query("DELETE FROM commentaires WHERE id = ? AND user_id = ?", [req.params['commentId'], req.userId])
        .then((commentDeleted) => {
            console.log(commentDeleted)
            res.status(200).json(commentDeleted);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}