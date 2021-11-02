const express = require('express');
const router = express.Router();
const ctrlComments = require('../controllers/commentaires');

//All routes using table posts to reach commentaires table

router.get("/get-one-comment/:commentId", ctrlComments.getOneComment);
router.post('/:postId', ctrlComments.createComment);
router.put('/:commentId', ctrlComments.modifyComment);
router.delete('/:commentId', ctrlComments.deleteComment);

module.exports = router;