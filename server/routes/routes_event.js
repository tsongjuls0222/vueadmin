const express = require('express');
const router = express.Router();
const API = require('../controllers/api_event');

router.get("/getpopup", API.getpopup);
router.post("/setpopupstatus", API.setpopupstatus);

module.exports = router;