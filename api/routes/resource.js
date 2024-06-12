const express = require("express");
const router = express.Router();

const resourceController = require("../controllers/resource");

router.get("/", resourceController.getResources);
router.get("/:id", resourceController.getResource);
router.get("/:id/skills", resourceController.getResourceSkills);
router.get("/:id/role-eligibility", resourceController.getResourceRoleEligibility);

router.delete("/:id/skill/:skillId", resourceController.deleteResourceSkill);
router.post("/:id/create-skill", resourceController.createResourceSkill);

module.exports = router;
