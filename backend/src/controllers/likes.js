const connection = require('../service/database');


exports.like_post = (req, res) => {
    console.log(req.body)
    connection
        .query("INSERT INTO likes (user_id, liked, post_id) VALUES (?, ?, ?)", [req.body.id, req.body.liked_post, req.params["postId"]])
        .then((like_post) => {
            console.log(like_post)
            res.status(200).json(like_post);
        })
        .catch((error) => {
            res.status(400).json(error)
            console.log(error);
        });
};

// exports.removeLikeOrDislike = (req, res) => {
//     connection
//         .query("UPDATE likes SET liked = ? WHERE id = ?", [req.body, req.params['likeId']])
//         .then((likeOrDislike) => {
//             res.json(likeOrDislike);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
