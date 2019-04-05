const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  teacherid: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  secretcode: {
    type: String,
    required: true
  }
});
module.exports = Classroom = mongoose.model("classroom", ClassroomSchema);
