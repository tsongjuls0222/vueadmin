const express = require('express');
const router = express.Router();
const API = require("../controllers/api_moneyCount");

router.get("/", API.fetchAllTransaction);
// router.get("/:id", API.fetchPostByID);
// router.post("/", upload, API.createPost);
// router.patch("/:id", upload, API.updatePost);
// router.delete("/:id", API.deletePost);


module.exports = router;