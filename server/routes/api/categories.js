const express = require("express");
const router = express.Router();
const multer = require("multer");

const categoriesController = require("../../controllers/categoriesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

const upload = multer({ dest: "categoryImgUploads/" });

router.post(
  "/new",
  verifyRoles(ROLES_LIST.Admin),
  upload.single("categoryImg"),
  categoriesController.createNewCategory
);

router.post(
  "/edit/:categoryName",
  verifyRoles(ROLES_LIST.Admin),
  upload.single("categoryImg"),
  categoriesController.updateCategory
);

router.delete(
  "/delete/:categoryName",
  verifyRoles(ROLES_LIST.Admin),
  upload.single("categoryImg"),
  categoriesController.deleteCategory
);

module.exports = router;
