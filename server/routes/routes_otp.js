const express = require('express');
const router = express.Router();
const API = require('../controllers/api_otp');

router.post("/getotp", API.getOTP);
router.post("/getcasino", API.getCasino);

module.exports = router;