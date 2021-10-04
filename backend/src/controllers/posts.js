const connection = require('../service/database');

//Get all posts on timeline
exports.getAllPosts = (req, res) => {
    connection
        .query("SELECT * FROM posts")
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            console.log(err);
        });
}
//Get one post and all comments about it
exports.getOnePost = (req, res) => {
    connection
        .query("SELECT posts.id FROM posts JOIN commentaires ON commentaires.commentaire_id = posts.id", req.params['postId'])
        .then((post) => {
            res.json(post[0]);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.createPost = (req, res) => {
    connection
        .query("INSERT INTO posts SET ?", [req.body])
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.modifyPost = (req, res) => {
    connection
        .query("UPDATE posts SET ? WHERE id = ?", [req.body, req.params['postId']])
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.deletePost = (req, res) => {
    connection
        .query("DELETE FROM posts WHERE id = ?", req.params['postId'])
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
        });
}