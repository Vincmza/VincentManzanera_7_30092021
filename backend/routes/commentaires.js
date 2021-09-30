const express = require('express');
const router = express.Router();
const ctrlComments = require('../controllers/commentaires');

router.get('/:id/commentaires', ctrlComments.getAllComments);
router.get('/:id/commentaires/:id', ctrlComments.getOneComment);
router.post('/:id/commentaires', ctrlComments.createComment);
router.put('/:id/commentaires/:id', ctrlComments.modifyComment);
router.delete('/:id/commentaires/:id', ctrlComments.deleteComment);

module.exports = router;