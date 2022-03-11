const express = require('express');
const router = express.Router();
const API = require('../controllers/api_otp');

router.post("/getotp", API.getOTP);
router.post("/getcasino", API.getCasino);
router.get("/gettimer", API.gettimer);
router.post("/settimer", API.settimer);

module.exports = router;