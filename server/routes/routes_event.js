const express = require('express');
const router = express.Router();
const API = require('../controllers/api_event');
const multer = require('multer');
var crypto = require('crypto');
var path = require('path');
const { time } = require('console');

//multer middleware
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
}).single('content');

//popup
router.get("/getpopup", API.getpopup);
router.get("/findpopup:id", API.findPopup);
router.post("/setpopupstatus", API.setpopupstatus);
router.post("/addpopup", upload, API.addPopup);
router.post("/editpopup:id", upload, API.editPopup);
router.delete("/deletepopup:id", API.deletePopup);

const currentDate = new Date();
let storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/team_icon');
    },
    filename: function (req, file, cb) {
        cb(null, (crypto.randomBytes(7).toString('hex') + '-' + currentDate.getTime() + path.extname(file.originalname)));
    },
});

let upload2 = multer({
    storage: storage2,
}).single('ibd_contents');

//notice
router.get('/getnotice', API.getNotice);
router.get('/findnotice:id', API.findNoticeById);
router.post("/setnoticestatus", API.setNoticeStatus);
router.post('/addnotice', upload2, API.addNotice);
router.post('/editnotice:id', upload2, API.editNotice);
router.delete('/deletenotice:id', API.deleteNotice);
router.post('/savesorting', API.savesorting);

let storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/team_icon');
    },
    filename: function (req, file, cb) {
        cb(null, (crypto.randomBytes(7).toString('hex') + '-' + currentDate.getTime() + path.extname(file.originalname)));
    },
});

let upload3 = multer({
    storage: storage3,
}).fields([
    {
        name: 'ibd_contents',
        maxCount: 1
    },
    {
        name: 'ibd_thumbnail',
        maxCount: 1
    }
]);

//board
router.get('/getboard', API.getBoard);
router.get('/findboard:id', API.findBoardById);
router.post("/setboardstatus", API.setBoardStatus);
router.post('/addBoard', upload3, API.addBoard);
router.post('/editBoard:id', upload3, API.editBoard);
router.delete('/deleteBoard:id', API.deleteBoard);

module.exports = router;