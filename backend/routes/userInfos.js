const express = require('express');
const router = express.Router();
const ctrlUserInfos = require('../controllers/userInfos');

router.get('/', ctrlUserInfos.getAllUsers);
router.get('/:id', ctrlUserInfos.getOneUser);
router.post('/', ctrlUserInfos.createUser);
router.put('/:id', ctrlUserInfos.modifyUser);
router.delete('/:id', ctrlUserInfos.deleteUser);

module.exports = router;