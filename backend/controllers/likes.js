const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nehemah@1987",
    database: "db_groupomania",
});

connection.query = promisify(connection.query);

exports.getAllLikes = (req, res) => {
    connection
        .query("SELECT * FROM likes")
        .then((likes) => {
            res.json(likes);
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.getOneLike = (req, res) => {
    connection
        .query("SELECT * FROM likes WHERE id = ?", req.params["likeId"])
        .then((like) => {
            res.json(like);
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.addLikeOrDislike = (req, res) => {
    connection
        .query("INSERT INTO likes SET ?", [req.body])
        .then((likeOrDislike) => {
            res.json(likeOrDislike);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.removeLikeOrDislike = (req, res) => {
    connection
        .query("UPDATE likes SET liked = ? WHERE id = ?", [req.body], req.params['likeId'])
        .then((likeOrDislike) => {
            res.json(likeOrDislike);
        })
        .catch((err) => {
            console.log(err);
        });
};
