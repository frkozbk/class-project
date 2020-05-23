const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const users = require('./routes/api/users');
const classroom = require('./routes/api/classroom');
const post = require('./routes/api/post');
const comment = require('./routes/api/comment');
const Classroom = require('./models/Classroom');
const Message = require('./models/Message');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Passport.js middlewareini kullan
app.use(passport.initialize());
// Passportjs config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/classroom', classroom);
app.use('/api/post', post);
app.use('/api/comment', comment);

const server = http.createServer(app);
const io = socketio(server);
const port = process.env.port || process.env.PORT || 5000;
io.on('connection', (socket) => {
  console.log('connection');
  socket.on('disconnect', () => {
    console.log('User has left');
  });
  socket.on('join', async ({ classroomID }, callback) => {
    const classroom = await Classroom.findOne({ _id: classroomID }).populate('messages');
    callback(classroom.messages);
  });
  socket.on('message', async ({ msg, userId, classroomID }, callback) => {
    let classroom = await Classroom.findOne({ _id: classroomID });
    const message = new Message({
      content: msg,
      author: userId,
    });
    callback(message);
    classroom.messages.push(message.id);
    await classroom.save();
    await message.save();
    classroom = await Classroom.findOne({ _id: classroomID }).populate('messages');
    socket.broadcast.emit('newMessage', classroom.messages);
  });
});

server.listen(port, () => `io connected`);

// app.listen(port, () => console.log(`Server running on port ${port}`));
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
