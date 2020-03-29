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
// desc Post route unu test et
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Post calısıyor" }));

// @route GET api/post/create/:c_id
// desc Post oluştur
// @access Private
// need validation
router.post(
  "/create/:c_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Classroom.findById(req.params.c_id)
      .then(() => {
        const content = req.body.content;
        const newPost = new Post({
          author: req.user.id,
          content,
          classid: req.params.c_id
        });
        newPost.save();
        res.json(newPost);
      })
      .catch(() => {
        return res.json({ msg: "Classroom bulunamadı" });
      });
  }
);
// @route GET api/post/update/:p_id
// desc Post'u güncelle
// @access Private
router.post(
  "/update/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const p_id = req.params.p_id;
    const content = req.body.content;
    Post.findOne({ _id: p_id })
      .then(post => {
        if (!post.author === req.user.id) {
          return res.json({ msg: "Bu post sizin değil" });
        }
        post.content = content;
        post.save();
        return res.json(post);
      })
      .catch(() => {
        return res.json({ msg: "Post bulunamadı" });
      });
  }
);
// @route GET api/post/delete/:p_id
// desc Post'u sil
// @access Private
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
      .catch(() => {
        return res.json({ msg: "Post bulunamadı" });
      });
  }
);
// @route GET api/post/update/:p_id
// desc Post'u ara
// @access Private
router.get(
  "/getpost/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.p_id)
      .populate("comments", { author: 1, date: 1, content: 1 })
      .then(post => console.log(post))
      .catch(() => res.json({ msg: "Post bulunamadı." }));
  }
);
router.get(
    "/getClassPosts/:c_id",
    passport.authenticate("jwt", { session: false }),
    (req,res) => {
        Post.find({classid :req.params.c_id}).then((posts) => {
            res.json({posts})
        })
    }

)
module.exports = router;
