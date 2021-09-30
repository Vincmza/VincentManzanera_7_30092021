const express = require("express");
const mysql = require("mysql");
const { promisify } = require("util");

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nehemah@1987",
    database: "db_groupomania",
});

//récupération de tous les utilisateurs
app.get("/api/users", (req, res) => {
    connection
        .query("SELECT * FROM users")
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
        });
});

//récupérations d'un utilisateur
app.get("/api/users/:id", (req, res) => {
    connection
        .query("SELECT * FROM users WHERE id = ?", [req.params.id])
        .then((user) => {
            res.json(user[0]);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Création d'un utilisateur
app.post("/api/users", (req, res) => {
    connection
        .query("INSERT INTO users SET ?", [req.body])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Modification d'un utilisateur
app.put("/api/users/:id", (req, res) => {
    connection
        .query("UPDATE users SET ? WHERE id = ?", [req.body, req.params.id])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete("/api/users/:id", (req, res) => {
    connection
        .query("DELETE FROM users WHERE id = ?", [req.params.id])
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

connection.query = promisify(connection.query);
