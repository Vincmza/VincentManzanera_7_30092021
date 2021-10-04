const connection = require('../service/database');


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
        .query("UPDATE likes SET liked = ? WHERE id = ?", [req.body, req.params['likeId']])
        .then((likeOrDislike) => {
            res.json(likeOrDislike);
        })
        .catch((err) => {
            console.log(err);
        });
};
