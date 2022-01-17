var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
  like: { type: Boolean, required: true },
  commentId: [{ type: Schema.Types.ObjectId, ref: "Comment", required: true }],
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date },
});

module.exports = mongoose.model("like", LikeSchema);
