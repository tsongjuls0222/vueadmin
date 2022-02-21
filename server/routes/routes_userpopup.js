const express = require('express');
const router = express.Router();
const API = require("../controllers/api_userpopup");


router.get("/:id", API.UserPopupInformationTab);
router.get("/depositdata/:id", API.getDepositData);
router.get("/moneylogdata/:id", API.getMoneylogData);
router.get("/betlogdata1st/:id", API.getBetlogData1st);
router.get("/pointlogdata/:id", API.getPointlogData);
router.post("/updateundersurveillancestatus", API.updateSurveillanceStatus);
router.get("/refreshbalanceandpoint/:id", API.refreshBalanceAndPoint);
router.get("/refreshcasino/:id", API.UserPopupInformationTabGetNewCasino);
router.get("/refreshslot/:id", API.UserPopupInformationTabGetNewSlot);
router.get("/recommender/:id", API.UserPopupInformationTabGetRecommender);
router.get("/codename/:id", API.getCodeName);
router.get("/bank/list", API.UserPopupInformationTabGetBankList);
router.get("/userbetinfo/:id", API.getUserBetInfo);
router.get("/checkrecommender/:id", API.checkRecommender);
router.get("/checkcode/:id", API.checkPartner);
router.put("/updateuserinformation", API.updateUserInformation);
router.put("/updatebalance", API.updateBalance);
router.post("/addtransaction", API.addTransaction)

module.exports = router;