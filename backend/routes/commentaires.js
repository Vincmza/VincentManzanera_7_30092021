const express = require('express');
const router = express.Router();
const ctrlComments = require('../controllers/commentaires');

//All routes using table posts to reach commentaires table
router.get('/', ctrlComments.getAllComments);
router.get('/:commentId', ctrlComments.getOneComment);
router.post('/', ctrlComments.createComment);
router.put('/:commentId', ctrlComments.modifyComment);
router.delete('/:commentId', ctrlComments.deleteComment);

module.exports = router;