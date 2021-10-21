const express = require('express');
const router = express.Router();
const ctrlLikes = require('../controllers/likes');

/*like and unlike*/
router.post('/like-post/:postId', ctrlLikes.like_post);
router.put('/unlike-post/:postId', ctrlLikes.unlike_post);

/*dislike and undislike*/
router.post('/dislike-post/:postId',ctrlLikes.dislike_post);

module.exports = router;