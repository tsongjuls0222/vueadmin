const express = require('express');
const router = express.Router();
const API = require("../controllers/api_agents");
// const multer = require('multer');

//multer middleware
// let storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });

// let upload = multer({
//     storage: storage,
// }).single("image");

router.get("/agents", API.fetchAllMemberListSelect1);
router.get("/codes", API.fetchAllMemberListSelect2);
router.get("/levels", API.fetchAllMemberListSelect3);
router.get("/members", API.fetchAllMemberListSelect4);
router.get("/fields", API.fetchAllMemberListSelect5);
// router.get("/:id", API.fetchPostByID);
// router.post("/", upload, API.createPost);
// router.patch("/:id", upload, API.updatePost);
// router.delete("/:id", API.deletePost);


module.exports = router;