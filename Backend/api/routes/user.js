const express = require("express");
const router = express.Router();
const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");
const jsonParser = express.json();

const UserController = require("../controllers/user");


//create user
router.post("/signup", UserController.user_signUp);

// get all users
router.get("/getall", jsonParser, UserController.user_getAll);

//login user
router.post("/login", jsonParser, UserController.user_login);

//get user profile
router.get("/:id", checkAuth, UserController.user_getProfile);

module.exports = router;