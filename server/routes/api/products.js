const express = require("express");
const router = express.Router();
const multer = require("multer");

const productsController = require("../../controllers/productsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

const upload = multer({ dest: "productsImgUploads/" });

router.post(
  "/new",
  verifyRoles(ROLES_LIST.Admin),
  upload.array("productImages", 4),
  productsController.handleNewProduct
);

router.post(
  "/edit/:productId",
  verifyRoles(ROLES_LIST.Admin),
  upload.array("productImages", 4),
  productsController.updateProduct
);

router.delete(
  "/delete/:productId",
  verifyRoles(ROLES_LIST.Admin),
  productsController.deleteProduct
);

module.exports = router;
