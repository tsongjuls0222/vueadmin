const express = require('express');
const router = express.Router();
const API = require("../controllers/api_customerservice");

//group
router.get("/getgroup", API.getgroup);
router.get("/findgroup:id", API.findgroupbyid);
router.post("/addgroup", API.addgroup);
router.post("/editgroup", API.editgroup);
router.delete("/deletegroup:id", API.deletegroup);
router.post("/savestatus", API.savestatus);
router.post("/savesortgroup", API.savesortgroup);

//list
router.post("/getlist", API.getlist);
router.get("/findlist:id", API.findlistbyid);
router.post("/addlist", API.addlist);
router.post("/editlist", API.editlist);
router.delete("/deletelist:id", API.deletelist);
router.post("/savelist", API.savelist);
router.post("/savesortlist", API.savesortlist);

// forms


module.exports = router;