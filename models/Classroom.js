const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teacherid: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  secretcode: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'message',
    },
  ],
});
module.exports = Classroom = mongoose.model('classroom', ClassroomSchema);
