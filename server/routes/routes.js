const express = require('express');
const router = express.Router();
const API = require("../controllers/api");


router.get("/", API.fetchAllPost);
router.get("/sample", verifyToken, API.sampletoken);
router.post("/samplelogin", API.sampletokenlogin);

function verifyToken (req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403)
    }
}



module.exports = router;