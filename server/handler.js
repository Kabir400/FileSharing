const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const fileRouter = require("./routes/fileRouter.js");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", fileRouter);

exports.handler = serverless(app);
