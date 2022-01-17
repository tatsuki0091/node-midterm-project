var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: { type: String, required: true },
  article: [{ type: Schema.Types.ObjectId, ref: "Article", required: true }],
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date },
});

module.exports = mongoose.model("comment", CommentSchema);
