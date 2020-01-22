const express = require("express");
const router = express.Router();
const Gift = require("../models/gift");
const checkAuth = require("../middleware/check-auth");
const jsonParser = express.json();

const GiftController = require("../controllers/gift");

//add gift
router.post("/add", jsonParser, checkAuth, GiftController.add_gift);

module.exports = router;