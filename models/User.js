const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isteacher: {
    type: Boolean,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "classroom",
      unique:true
    }
  ]
});
module.exports = User = mongoose.model("users", UserSchema);
