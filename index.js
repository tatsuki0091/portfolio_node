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

app.use(bodyParser.json({ type: "*/*" }));

app.configure(function () {
  app.use(allowCrossDomain);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);

/**
 \* OPTIONSメソッドの実装
 \*/
app.options("*", function (req, res) {
  res.sendStatus(200);
});
email(app);

// Serverの設定
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);

console.log("Server listening on:", port);
