const express = require('express');
const router = express.Router();
const API = require("../controllers/api_gamelist");


router.get("/getminigamelist", API.getminigamelist);
router.get("/getmaintenance", API.getmaintenance);
router.post("/addminigame", API.addminigame);
router.post("/saveminigame", API.saveminigame);
router.post("/deletesubgame", API.deletesubgame);
router.delete("/deleteminigame:id", API.deleteminigame);

module.exports = router;