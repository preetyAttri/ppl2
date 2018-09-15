var express = require("express");
var app = express();
var mongoose = require("mongoose");
var router = require("./userData/router");
var category = require("./categoryData/categoryRouter");
var postRouter = require("./postData/postRouter");
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/nativeData");
app.use("/", router);
app.use("/category", category);
app.use("/post", postRouter);
app.listen(4002, () => {
  console.log("start");
});
