const express = require('express');
const router = express.Router();
const ctrlComments = require('../controllers/commentaires');
const renforcedAuth = require("../middlewares/routeSecure");


//All routes using table posts to reach commentaires table

router.get("/get-one-comment/:commentId", ctrlComments.getOneComment);
router.post('/:postId', ctrlComments.createComment);
router.put('/:commentId',renforcedAuth.routeSecure("commentaires"), ctrlComments.modifyComment);
router.delete('/:commentId',renforcedAuth.routeSecure("commentaires"), ctrlComments.deleteComment);

module.exports = router;