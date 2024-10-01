const { getUploadUrl, getViewUrl, getDownloadUrl } = require("../config/s3.js");

const getPresinedUrlForUpload = async (req, res) => {
  try {
    const { fileName, fileType } = req.body;
    const name = `${Date.now()}-${fileName}`;
    const url = await getUploadUrl(name, fileType);
    res.status(200).json({
      url,
      fileName: name,
      message: "successfully generated the presigned url!",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPresinedUrlForView = async (req, res) => {
  try {
    const { fileName } = req.body;
    const url = await getViewUrl(fileName);
    res.status(200).json({ url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPresinedUrlForDownload = async (req, res) => {
  try {
    const { fileName } = req.body;
    const url = await getDownloadUrl(fileName);
    res.status(200).json({ url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPresinedUrlForUpload,
  getPresinedUrlForView,
  getPresinedUrlForDownload,
};
