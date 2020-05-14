const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  content: {
    type: String,
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "post"
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});
module.exports = Comment = mongoose.model("comment", CommentSchema);
