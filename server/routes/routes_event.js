const express = require('express');
const router = express.Router();
const API = require('../controllers/api_event');
const multer = require('multer');
var crypto = require('crypto');
var path = require('path')

//multer middleware
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/popup');
    },
    filename: function (req, file, cb) {
        cb(null, (crypto.randomBytes(5).toString('hex') + path.extname(file.originalname)));
    },
});

let upload = multer({
    storage: storage,
}).single('content');

//popup
router.get("/getpopup", API.getpopup);
router.get("/findpopup:id", API.findPopup);
router.post("/setpopupstatus", API.setpopupstatus);
router.post("/addpopup", upload, API.addPopup);
router.post("/editpopup:id", upload, API.editPopup);
router.delete("/deletepopup:id", API.deletePopup);

//notice
router.get('/getnotice', API.getNotice);

module.exports = router;