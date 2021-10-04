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

exports.getAllComments =(req, res) => {
    connection
        .query("SELECT * FROM commentaires")
        .then((comments) => {
            res.json(comments);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getOneComment = (req, res) => {
    console.log(req.params['commentId'])
    connection
        .query("SELECT * FROM commentaires WHERE id = ?", req.params['commentId'])
        .then((comment) => {
            res.json(comment[0]);
        })
        .catch((err) => {
            console.log(err);
        });
}


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