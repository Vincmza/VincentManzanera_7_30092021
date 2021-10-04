const express = require('express');
const router = express.Router();
const ctrlLikes = require('../controllers/likes');

router.post('/', ctrlLikes.addLikeOrDislike);
router.put('/:likeId', ctrlLikes.removeLikeOrDislike);

module.exports = router;