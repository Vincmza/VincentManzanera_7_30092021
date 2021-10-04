const mysql = require("mysql");
const { promisify } = require("util");
require('dotenv').config()

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.dbPassword,
    database: process.env.dbName,
});

connection.query = promisify(connection.query);

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

exports.getOnePost = (req, res) => {
    connection
        .query("SELECT * FROM posts WHERE id = ?", req.params['postId'])
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