const express = require('express');
const router = express.Router();
const ctrlLikes = require('../controllers/likes');
const renforcedAuth = require("../middlewares/routeSecure");

/*like and unlike*/
router.get("/:postId", ctrlLikes.getUserLike);
router.post('/like-post/:postId', ctrlLikes.like_post);
router.delete('/unlike-post/:likeId', ctrlLikes.unlike_post);


module.exports = router;