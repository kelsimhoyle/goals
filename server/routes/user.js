const user = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/", user.create);
router.get("/", user.findAll);
router.get("/:id", user.findOne);
router.put("/:id", user.updateOne);
router.delete("/:id", user.deleteOne);
router.post("/login", user.login);
router.post("/logout", user.logout);

module.exports = router;