const express = require("express");

//controllers
const {
  getPresinedUrlForUpload,
  getPresinedUrlForView,
  getPresinedUrlForDownload,
} = require("../controllers/fileController.js");

const router = express.Router();

router.post("/getUrl", getPresinedUrlForUpload);
router.post("/viewUrl", getPresinedUrlForView);
router.post("/downloadUrl", getPresinedUrlForDownload);

module.exports = router;
