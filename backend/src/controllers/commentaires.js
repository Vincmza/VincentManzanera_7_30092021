const connection = require('../service/database');

exports.getOneComment = (req, res)=>{
    connection
        .query("SELECT * FROM commentaires WHERE id = ? AND user_id = ?",[req.params["commentId"], req.userId])
        .then((oneComment)=>{
            console.log(oneComment)
            res.status(200).json(oneComment[0])
        })
        .catch((error)=>{
            console.log(error)
            res.status(400).json("Erreur lors de l'obtention du commentaire")
        })
}

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
        .query("UPDATE commentaires SET content_comment = ? WHERE id = ? AND user_id = ?", [req.body.updateCommentContent, req.params['commentId'], req.userId])
        .then((modifiedComment) => {
            console.log(modifiedComment)
            res.status(200).json("Commentaire modifié !");
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json("Echec lors de la modification du commentaire");
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