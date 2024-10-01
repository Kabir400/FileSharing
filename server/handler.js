const express = require("express");
const serverless = require("serverless-http");

const fileRouter = require("./routes/fileRouter.js");

const app = express();

app.use(express.json());

app.use("/api/v1", fileRouter);

exports.handler = serverless(app);
