var express = require("express");
var router = express.Router();
const path = require("path");
const Article = require("../models/article");

router.get("/register", function (req, res, next) {
  console.log("aaaaaaaaaaaa");
  res.render("register", { title: "register" });
});

module.exports = router;
