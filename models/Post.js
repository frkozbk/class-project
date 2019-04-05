const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true
  },
  classid: {
    type: Schema.Types.ObjectId,
    ref: "classroom"
  },
  content: {
    type: String,
    required: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment"
    }
  ],
  date: {
    type: Date,
    default: Date.now,
    require: true
  }
});
module.exports = Post = mongoose.model("post", PostSchema);
