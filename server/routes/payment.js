const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/paystack", paymentController.handlePayWithPayStack);
router.post("/flutterwave", paymentController.handlePayWithFlutterwave);

module.exports = router;
