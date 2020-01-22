const express = require("express");
const router = express.Router();
const Skill = require("../models/skill");
const checkAuth = require("../middleware/check-auth");
const jsonParser = express.json();

const SkillController = require("../controllers/skill");

//add skill
router.post("/add", jsonParser, checkAuth, SkillController.add_skill);

//get all skills
router.get("/allskills", jsonParser, checkAuth, SkillController.all_skills);

module.exports = router;