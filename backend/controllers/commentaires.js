const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nehemah@1987",
    database: "db_groupomania",
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
    connection
        .query("SELECT * FROM commentaires WHERE id = ?", [req.params.id])
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
        .query("UPDATE commentaires SET ? WHERE id = ?", [req.body, req.params.id])
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.deleteComment = (req, res) => {
    connection
        .query("DELETE FROM commentaires WHERE id = ?", [req.params.id])
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
        });
}