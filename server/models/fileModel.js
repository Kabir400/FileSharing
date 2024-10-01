const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileId: { type: String, required: true, unique: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const fileModel = mongoose.model("file", fileSchema);

module.exports = fileModel;
