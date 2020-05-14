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

const app = express();
console.clear();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

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

io.on('connection', (socket) => {
  console.log('connection');
  socket.on('disconnect', () => {
    console.log('User has left');
  });
});

server.listen(5001, () => `io connected`);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
