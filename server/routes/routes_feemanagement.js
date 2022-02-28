const express = require('express');
const router = express.Router();
const API = require('../controllers/api_feemanagement');

router.get("/feelogs", API.getFeelogs);
router.post("/filterfeelogs", API.getFilterFeelogs);

module.exports = router;