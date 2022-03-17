const express = require('express');
const router = express.Router();
const API = require("../controllers/api_league");

router.get("/getevent", API.getevent);
router.get("/getnation", API.getnation);
router.get("/getnations:id", API.getnations);
router.post("/getlist", API.getlist);

module.exports = router;