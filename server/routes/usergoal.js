const express = require("express");
const router = express.Router();
const user = require("../controllers/usergoal.controller")

// query options: orderby, order (default ASC), and category
router.post("/", user.create);
router.post("/user/:id", user.createNewGoal);
router.get("/user/:id", user.getByUserId);
router.get("/", user.getAll);
router.get("/:id", user.getById);
router.put("/:id", user.updateOne);
router.delete("/:id", user.deleteOne);

module.exports = router;