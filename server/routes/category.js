
const express = require("express");
const router = express.Router();
const category = require("../controllers/category.controller");

router.post("/", category.create);
router.get("/", category.findAll);
router.get("/:id", category.getById);
router.put("/:id", category.updateOne);
router.delete("/:id", category.deleteOne);

module.exports = router;