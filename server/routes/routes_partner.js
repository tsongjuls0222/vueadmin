const express = require('express');
const router = express.Router();
const API = require('../controllers/api_partner');
const multer = require('multer');
var crypto = require('crypto');
var path = require('path');

//popup
router.get("/getpartnertree", API.getpartnertree);
router.get("/getpartnerinfo:id", API.getpartnerinfo);
router.post("/addcode", API.addcode);
router.post("/editcode:id", API.editcode);
router.post("/deletecode", API.deletecode);
router.post("/addaccount", API.addaccount);
router.post("/editaccount", API.editaccount);
router.post("/deleteaccount", API.deleteaccount);
router.post("/addagent", API.addagent);
router.post("/editagent", API.editagent);
router.post("/deleteagent", API.deleteagent);
router.get("/gettransferagentcodes", API.gettransferagentcodes);
router.get("/getmemberagentcodes", API.getmemberagentcodes);
router.post("/transferpartner", API.transferpartner);
router.post("/transfermember", API.transfermember);
router.post("/transferbalance", API.transferbalance);
router.get("/transferlogs:id", API.transferlogs);
router.get("/getinfosportsconfig", API.getinfosportsconfig);
router.post("/updateinfosportsconfig", API.updateinfosportsconfig);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/bank_logo');
    },
    filename: function (req, file, cb) {
        cb(null, (crypto.randomBytes(5).toString('hex') + path.extname(file.originalname)));
    },
});

let upload = multer({
    storage: storage,
}).single('bank_image');

router.get("/getbanklist", API.getbanklist);
router.post("/addbank", upload, API.addbank);
router.get("/findbank:id", API.findbank);
router.post("/editbank:id", upload, API.editbank);
router.delete("/deletebank:id", API.deletebank);
router.post("/bankstatus", API.bankstatus);


module.exports = router;