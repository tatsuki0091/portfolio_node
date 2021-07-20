// 各種ライブラリ設定
const express = require("express");
const http = require("http");
var cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const email = require("./email");

app.get("/robots.txt", function (req, res) {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
});

// Appの設定
app.use(morgan("combined"));

app.use(bodyParser.json({ type: "*/*" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  // res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Max-Age", "86400");
  next();
});

/**
 \* OPTIONSメソッドの実装
 \*/
app.options("*", function (req, res) {
  res.sendStatus(200);
});

app.use(
  cors({
    origin: "https://localhost:3000/",
    credentials: true,
  })
);

email(app);

// Serverの設定
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);

console.log("Server listening on:", port);
