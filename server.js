const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const classroom = require("./routes/api/classroom");
const post = require("./routes/api/post");
const comment = require("./routes/api/comment");

const app = express();
console.clear();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport.js middlewareini kullan
app.use(passport.initialize());
// Passportjs config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/classroom", classroom);
app.use("/api/post", post);
app.use("/api/comment", comment);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
