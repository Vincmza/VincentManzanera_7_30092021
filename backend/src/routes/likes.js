const express = require('express');
const router = express.Router();
const ctrlLikes = require('../controllers/likes');

router.post('/like-post/:postId', ctrlLikes.like_post);
// router.put('/:likeId', ctrlLikes.removeLikeOrDislike);

module.exports = router;