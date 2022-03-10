const express = require('express');
const router = express.Router();
const API = require('../controllers/api_partner');

//popup
router.get("/getpartnertree", API.getpartnertree);

module.exports = router;