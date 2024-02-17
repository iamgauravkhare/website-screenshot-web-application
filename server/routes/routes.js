const express = require("express");
const router = express.Router();
const { captureScreenshot } = require("../controllers/controllers");

router.post("/capture-screenshot", captureScreenshot);

module.exports = router;
