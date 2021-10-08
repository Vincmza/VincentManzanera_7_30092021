const express = require('express');
const router = express.Router();
const ctrlUserConnection = require('../controllers/userConnection');

router.post('/signup', ctrlUserConnection.signup);
router.post('/login', ctrlUserConnection.login);

module.exports = router;