const express = require('express');
const router = express.Router();
const ctrlLikes = require('../controllers/likes');

router.post('/like-post/:postId', ctrlLikes.like_post);
router.put('/unlike-post/:postId', ctrlLikes.unlike_post);

module.exports = router;