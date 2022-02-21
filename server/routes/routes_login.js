const express = require('express');
const router = express.Router();
const API = require("../controllers/api_login");


router.post("/", API.getToken);

// router.post("/token", verifyToken, API.setToken);

// function verifyToken (req, res, next){
//     res.sendStatus(bearerHeader)
// }



module.exports = router;