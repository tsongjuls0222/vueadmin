const express = require('express');
const router = express.Router();
const API = require('../controllers/api_feemanagement');

router.get("/feelogs", API.getFeelogs);
router.post("/filterfeelogs", API.getFilterFeelogs);
router.get("/getBonus:id", API.getBonus);
router.get("/getConfig:id", API.getConfig);
router.put("/setBonus", API.setBonus);
router.put("/setConfig", API.setConfig);
router.get("/dailymax", API.getDaily);
router.put("/setdailymax", API.setDaily);

module.exports = router;