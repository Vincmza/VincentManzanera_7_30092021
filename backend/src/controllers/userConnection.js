const connection = require("../service/database");
require('dotenv').config()

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
    if (schema.validate(data.password)) {
        bcrypt
            .hash(data.password, 10)
            .then((hash) => {
                data.password = hash;
                connection
                    .query("INSERT INTO users (email, password, username, role_id) VALUES (?, ?, ?, '1')", [data.email, data.password, data.username])
                    .then((user) => {
                        res.status(201).json(user);
                    })
                    .catch(() => {
                       res.status(400).json({ message: "Email incorrect"});
                    });
            })
            .catch((error) => res.status(500).json({ error }));
    } else {
        return res.status(400).json({ message: "Mot de passe faible" });
    }
};

exports.login = (req, res, next) => {
    const data = { ...req.body };
    connection
        .query("SELECT * FROM users WHERE email = ?", [data.email])
        .then((userData) => {
            const user = userData[0];
            if (!user) {
                return res.status(401).json({ error: "Utilisateur inconnu" });
            }
            if(user.isActive == false){
                throw {erreur : "Compte désactivé !"}
            }
            
            bcrypt
                .compare(data.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: "Mot de passe incorrect" });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign({ userId: user.id, roleId: user.role_id }, process.env.secretToken, {
                            expiresIn: process.env.tokenExpiration
                        }),
                    });
                })
                .catch((error) => {                   
                    res.status(500).json(error);
                });
            // res.status(200).json(user)
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

