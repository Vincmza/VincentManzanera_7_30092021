const express = require('express');
const router = express.Router();
const ctrlPostsInfos = require('../controllers/posts');

router.get('/', ctrlPostsInfos.getAllPosts);
router.get('/:id', ctrlPostsInfos.getOnePost);
router.post('/', ctrlPostsInfos.createPost);
router.put('/:id', ctrlPostsInfos.modifyPost);
router.delete('/:id', ctrlPostsInfos.deletePost);

module.exports = router;