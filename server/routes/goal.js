const express = require("express");
const router = express.Router();
const goal = require("../controllers/goal.controller");

router.post("/", goal.create);
router.get("/", goal.findAll);
router.get("/:id",  goal.getById);
router.put("/:id",  goal.updateOne);
router.delete("/:id", goal.deletedOne);
router.get("/user/:id", goal.getUserGoals);

module.exports = router;