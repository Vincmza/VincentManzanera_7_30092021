const express = require('express');
const router = express.Router();
const ctrlPostsInfos = require('../controllers/posts');

//All routes in relation to posts table only
router.get('/', ctrlPostsInfos.getAllPosts);
router.get('/:postId', ctrlPostsInfos.getOnePost);
router.post('/create-post', ctrlPostsInfos.createPost);
router.put('/update-post/:postId', ctrlPostsInfos.modifyPost);
router.delete('/:postId', ctrlPostsInfos.deletePost);

module.exports = router;