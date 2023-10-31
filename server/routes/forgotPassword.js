const express = require("express");
const router = express.Router();
const forgetController = require("../controllers/forgotPasswordController");

router.post("/", forgetController.handleForget);
router.post("/reset", forgetController.handleResetPassword);

module.exports = router;
