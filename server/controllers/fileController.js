const {
  getUploadUrl,
  getViewUrl,
  getDownloadUrl,
  s3,
} = require("../config/s3.js");
const { HeadObjectCommand } = require("@aws-sdk/client-s3");

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
  const { fileName } = req.body;
  try {
    const headObjectCommand = new HeadObjectCommand({
      Bucket: "kabir-upload-app",
      Key: fileName,
    });

    try {
      await s3.send(headObjectCommand);
    } catch (error) {
      if (error.name === "NotFound") {
        return res.status(404).json({
          error: `The file with key "${key}" does not exist in the bucket.`,
        });
      }
      throw error; // handle other error
    }

    const url = await getViewUrl(fileName);
    res.status(200).json({ url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPresinedUrlForDownload = async (req, res) => {
  const { fileName } = req.body;
  try {
    const headObjectCommand = new HeadObjectCommand({
      Bucket: "kabir-upload-app",
      Key: fileName,
    });
    try {
      await s3.send(headObjectCommand);
    } catch (error) {
      if (error.name === "NotFound") {
        return res.status(404).json({
          error: `The file with key "${key}" does not exist in the bucket.`,
        });
      }
      throw error; // Handle any other errors
    }

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
