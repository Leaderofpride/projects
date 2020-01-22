const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const checkAuth = require("../middleware/check-auth");
const jsonParser = express.json();

const ReviewController = require("../controllers/review");

//add review
router.post("/add", jsonParser, checkAuth, ReviewController.add_review);

module.exports = router;