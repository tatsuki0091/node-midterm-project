var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String },
  created_on: { type: String },
  updated_on: { type: String },
});

module.exports = mongoose.model("article", ArticleSchema);
