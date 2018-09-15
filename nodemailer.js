var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sharmapreety537@gmail.com",
    pass: "090508aps"
  }
});

module.exports = transporter;
