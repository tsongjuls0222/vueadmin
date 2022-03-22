const express = require('express');
const router = express.Router();
const API = require("../controllers/api_league");
const multer = require('multer');
var crypto = require('crypto');
var path = require('path');

router.get("/getevent", API.getevent);
router.get("/getnation", API.getnation);
router.get("/getnations:id", API.getnations);
router.post("/getlist", API.getlist);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/team_icon');
    },
    filename: function (req, file, cb) {
        cb(null, (crypto.randomBytes(5).toString('hex') + path.extname(file.originalname)));
    },
});

let upload = multer({
    storage: storage,
}).single('img_file');

router.post("/setrow", upload, API.setrow);
router.post("/deleteimage", API.deleteimage);
router.get("/getleaguesorting", API.getleaguesorting);
router.post("/getleagues", API.getleagues);
router.post("/setleaguename", API.setleaguename);
router.post("/setcountryname", API.setcountryname);
router.post("/setleaguebox", API.setleaguebox);
router.post("/setcountrybox", API.setcountrybox);
router.post("/setleaguesort", API.setleaguesort);
router.post("/setcountrysort", API.setcountrysort);

let countrystorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/country_icon');
    },
    filename: function (req, file, cb) {
        cb(null, (crypto.randomBytes(5).toString('hex') + path.extname(file.originalname)));
    },
});

let countryupload = multer({
    storage: countrystorage,
}).single('img_file');

router.post("/countryupload", countryupload, API.countryupload);

//live
router.get("/getliveleaguesorting", API.getliveleaguesorting);

module.exports = router;