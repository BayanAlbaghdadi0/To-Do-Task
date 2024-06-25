const express = require('express');
const router = express.Router();
const LR = require('../controllers/login')
router.route('/').post(LR.signup)
module.exports = router