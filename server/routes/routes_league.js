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

module.exports = router;