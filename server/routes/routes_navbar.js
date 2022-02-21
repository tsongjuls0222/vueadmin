const express = require('express');
const router = express.Router();
const API = require("../controllers/api_navbar");


router.get("/moneycount", API.getTopInfo);
router.post("/moneycount/popupdata", API.getMoneyCountData);
router.post("/moneycount/popuptotal", API.getMoneyCountDataTotal);
router.get("/notorious/count", API.getNotoriousCount);
router.get("/notorious/data", API.getNotoriousData);



module.exports = router;