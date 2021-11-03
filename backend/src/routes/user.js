const express = require('express');
const router = express.Router();
const ctrlUserInfos = require("../controllers/user")

router.get("/connected-user", ctrlUserInfos.getUserInfos);
router.get("/", ctrlUserInfos.getAllUsers);
router.put("/delete-account", ctrlUserInfos.userDisabled)

module.exports = router;