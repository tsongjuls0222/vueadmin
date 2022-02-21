const express = require('express');
const router = express.Router();
const API = require("../controllers/api_admin");


router.get("/", API.getRadioButtonData);
router.get("/data", API.getTableData);
router.post("/transactiontone", API.transactType1);
router.post("/transactionttwo", API.transactType2);
router.post("/transactiontthree", API.transactType3);
router.get("/macro", API.getMacroSelection);
router.get("/macro/:id", API.getMacroSelectionContent);
router.get("/macrogroup", API.getMacroGroup);
router.get("/cagent/:id", API.fetchAllCodeByAgent);
router.get("/acode/:id", API.fetchAllAgentByCode);
router.get("/agents", API.fetchAllAgents);
router.get("/codes", API.fetchAllCodes);
router.post("/search", API.fetchAllSearch);
router.post("/search/radio", API.fetchNewRadioData);

module.exports = router;