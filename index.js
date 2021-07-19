// 各種ライブラリ設定
const express = require("express");
const http = require("http");
var cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const email = require("./email");

// Appの設定
app.use(morgan("combined"));
app.use(
  cors({
    origin: "http://localhost:3000/*",
  })
);
app.use(bodyParser.json({ type: "*/*" }));
email(app);

// Serverの設定
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);

console.log("Server listening on:", port);
