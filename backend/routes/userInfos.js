const express = require('express');
const router = express.Router();
const ctrlUserInfos = require('../controllers/userInfos');

router.get('/', ctrlUserInfos.getAllUsers);
router.get('/:userId', ctrlUserInfos.getOneUser);
router.post('/', ctrlUserInfos.createUser);
router.put('/:userId', ctrlUserInfos.modifyUser);
router.delete('/:userId', ctrlUserInfos.deleteUser);

module.exports = router;