const express = require("express");
const router = express.Router();
const passport = require("passport");

// Lodash
const _ = require("lodash");
// User models
const Classroom = require("../../models/Classroom.js");
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route GET api/post/test
// desc Tests post route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Post calısıyor" }));

// @route GET api/post/cre
// desc create post
// @access Public
// need validation
router.post(
  "/create/:c_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const content = req.body.content;
    const newPost = new Post({
      author: req.user.id,
      content,
      classid: req.params.c_id
    });
    newPost.save();
    res.json(newPost);
  }
);
router.post(
  "/update/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const p_id = req.params.p_id;
    const content = req.body.content;
    Post.findOne({ _id: p_id }).then(post => {
      if (!post.author === req.user.id) {
        return res.json({ msg: "Bu post sizin değil" });
      }
      post.content = content;
      post.save();
      return res.json(post);
    });
  }
);
router.delete(
  "/delete/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.p_id)
      .then(post => {
        if (!(post.author.toString() === req.user.id)) {
          return res.json({ msg: "Postun sahibi değilsiniz." });
        }
        console.log(post);
        post.remove();
        res.json({ msg: "Silindi" });
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
