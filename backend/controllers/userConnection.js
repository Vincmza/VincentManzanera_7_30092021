//Database related
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

//Security and authentification
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

/*User create an account using an email and a password*/
exports.signup = (req, res, next) => {
    const data = { ...req.body };
    if (schema.validate(req.body.password)) {
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                data.password = hash;
                connection
                    .query("INSERT INTO users SET ?", [data])
                    .then((user) => {
                        res.json(user);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => res.status(500).json({ error }));
    } else {
        return res.json({ message: "Votre mot de passe ou votre identifiant est invalide" });
    }
};

exports.login = (req, res, next) => {
    const data = { ...req.body };
    connection
        .query("SELECT * FROM users", [data])
        .then((user) => {
            console.log(user);
            if (!user) {
                return res.status(401).json({ error: "Utilisateur ou mot de passe inconnu !" });
            }
            bcrypt
                .compare(data.password, user.password)
                .then((valid) => {
                    console.log(valid);
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: "Utilisateur ou mot de passe inconnu !" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user.id }, process.env.secretToken, {
                            expiresIn: process.env.tokenExpiration,
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
