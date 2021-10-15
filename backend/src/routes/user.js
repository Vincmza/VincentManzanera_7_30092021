const express = require('express');
const router = express.Router();
const ctrlUserInfos = require("../controllers/user")

router.get("/:userId", ctrlUserInfos.getUserInfos);
router.get("/", ctrlUserInfos.getAllUsers);

module.exports = router;