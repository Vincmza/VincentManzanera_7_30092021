const express = require('express');
const router = express.Router();
const ctrlLikes = require('../controllers/likes');

/*like and unlike*/
router.post('/like-post/:postId', ctrlLikes.like_post);
router.delete('/unlike-post/:likeId', ctrlLikes.unlike_post);


module.exports = router;