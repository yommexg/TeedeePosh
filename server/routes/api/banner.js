const express = require("express");
const router = express.Router();
const multer = require("multer");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

const bannerController = require("../../controllers/bannerController");

const upload = multer({ dest: "bannerImgUploads/" });

router.post("/new",
verifyRoles(ROLES_LIST.Admin),
upload.single("bannerImg"),
bannerController.handleNewBanner);

module.exports = router
