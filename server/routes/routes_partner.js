const express = require('express');
const router = express.Router();
const API = require('../controllers/api_partner');

//popup
router.get("/getpartnertree", API.getpartnertree);
router.get("/getpartnerinfo:id", API.getpartnerinfo);
router.post("/addcode", API.addcode);
router.post("/editcode:id", API.editcode);
router.post("/deletecode", API.deletecode);


module.exports = router;