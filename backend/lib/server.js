const express = require("express");
const path = require("path");
const app = express();
const expressWS = require("express-ws");
const wsApp = expressWS(app);
app.use(express.static(path.resolve(__dirname, "../../frontend")));

module.exports = { app: wsApp.app };
