const express = require('express');
const router = express.Router();
const ctrlLikes = require('../controllers/likes');

router.get('/', ctrlLikes.getAllLikes);
router.get('/:likeId', ctrlLikes.getOneLike);
router.post('/', ctrlLikes.addLikeOrDislike);
router.put('/:likeId', ctrlLikes.removeLikeOrDislike);

module.exports = router;