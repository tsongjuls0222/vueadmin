const express = require('express');
const router = express.Router();
const API = require("../controllers/api_memberList");

router.get("/", API.fetchAllMemberList);
router.post("/", API.fetchAllMemberListSearch);
router.get("/:id", API.fetchAllCodeByAgent);
router.get("/cagent/:id", API.fetchAllAgentByCode);
router.get("/code/:id", API.filterFetchCode);
router.get("/agent/:id", API.filterFetchAgent);
// router.get("/:id", API.fetchPostByID);
// router.post("/", upload, API.createPost);
// router.patch("/:id", upload, API.updatePost);
// router.delete("/:id", API.deletePost);


module.exports = router;