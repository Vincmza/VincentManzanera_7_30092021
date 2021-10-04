const connection = require('../service/database');

exports.createComment = (req, res) => {
    connection
        .query("INSERT INTO commentaires SET ?", [req.body])
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
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
    connection
        .query("DELETE FROM commentaires WHERE id = ?", req.params['commentId'])
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
        });
}