const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const checkAuth = require("../middleware/check-auth");
const jsonParser = express.json();

const CompanyController = require("../controllers/company");

// create company
router.post("/signup", CompanyController.company_signUp);

// login company
router.post("/login", jsonParser, CompanyController.company_login);

// get company page
router.get("/:id", checkAuth, CompanyController.company_getProfile);

// get all companies in order
router.post("/getall", checkAuth, CompanyController.company_getAll);

module.exports = router;