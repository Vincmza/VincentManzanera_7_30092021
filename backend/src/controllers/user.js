const connection = require("../service/database");

exports.getUserInfos = (req, res) => {
    console.log(req.params["userId"]);
    connection
        .query("SELECT * FROM users WHERE id = ?", req.params["userId"])
        .then((user) => {
            const userInfos = user[0];
            res.status(200).json(userInfos), console.log(user);
        })
        .catch(() => {
            res.status(400).json({ error: "Problème avec la requête" });
        });
};
exports.getAllUsers = (req, res) => {
    connection
        .query("SELECT id, email, username FROM users")
        .then((users) => {
            res.status(200).json(users), console.log(users);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
};
exports.userDisabled = (req, res) => {
    connection
        .query("UPDATE users SET isActive = ? WHERE id = ?", [req.body.isActive, req.userId])
        .then((userDisabled)=>{
            console.log(userDisabled)
            res.status(200).json({message : "Utilisateur désactivé"})
        })
        .catch((error)=>{
            console.log(error)
            res.status(400).json({message : "Problème lors de la désactivation"})
        })
}