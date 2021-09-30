const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nehemah@1987",
    database: "db_groupomania",
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
        .query("SELECT * FROM users WHERE id = ?", [req.params.id])
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
        .query("UPDATE users SET ? WHERE id = ?", [req.body, req.params.id])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.deleteUser = (req, res) => {
    connection
        .query("DELETE FROM users WHERE id = ?", [req.params.id])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
}