const express = require('express');
const router = express.Router();
const API = require('../controllers/api_feemanagement');

router.get("/feelogs", API.getFeelogs);
router.post("/filterfeelogs", API.getFilterFeelogs);
router.get("/getBonus:id", API.getBonus);
router.get("/getConfig:id", API.getConfig);
router.post("/setBonus", API.setBonus);

module.exports = router;