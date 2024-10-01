const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AccessKey,
    secretAccessKey: process.env.SecretKey,
  },
});

const getUploadUrl = async (fileName, fileType) => {
  const command = new PutObjectCommand({
    Bucket: "kabir-upload-app",
    Key: fileName,
    ContentType: fileType,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};

const getViewUrl = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: "kabir-upload-app",
    Key: fileName,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};

const getDownloadUrl = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: "kabir-upload-app",
    Key: fileName,
    ResponseContentDisposition: "attachment", // Triggers download
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};
module.exports = { s3, getUploadUrl, getViewUrl, getDownloadUrl };
