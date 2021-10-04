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

exports.getAllUsers =(req, res) => {
    connection
        .query("SELECT * FROM users")
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getOneUser = (req, res) => {
    connection
        .query("SELECT * FROM users WHERE id = ?", req.params['userId'])
        .then((user) => {
            res.json(user[0]);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.createUser = (req, res) => {
    connection
        .query("INSERT INTO users SET ?", [req.body])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.modifyUser = (req, res) => {
    connection
        .query("UPDATE users SET ? WHERE id = ?", [req.body, req.params['userId']])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.deleteUser = (req, res) => {
    connection
        .query("DELETE FROM users WHERE id = ?", req.params['userId'])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
}