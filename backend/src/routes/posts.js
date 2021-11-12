const express = require('express');
const router = express.Router();
const ctrlPostsInfos = require('../controllers/posts');
const renforcedAuth = require("../middlewares/routeSecure")
const multer = require("../middlewares/multer-config");

//All routes in relation to posts table only
router.get('/', ctrlPostsInfos.getAllPosts);
router.get('/:postId', ctrlPostsInfos.getOnePost);
router.post('/create-post', multer, ctrlPostsInfos.createPost);
router.put('/update-post/:postId',renforcedAuth.routeSecure("posts"), multer, ctrlPostsInfos.modifyPost);
router.delete('/:postId',renforcedAuth.routeSecure("posts"), ctrlPostsInfos.deletePost);

module.exports = router;