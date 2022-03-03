const express = require('express');
const router = express.Router();
const API = require('../controllers/api_otp');

router.get("/getotp", API.getOTP);

module.exports = router;