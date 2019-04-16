const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

//Lodash
const _ = require("lodash");
// Load Classroom model
const Classroom = require("../../models/Classroom.js");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Comment çalışıyor" });
  }
);
//need validation
router.post(
  "/create/:p_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.p_id)
      .then(post => {
        const comment = new Comment({
          author: req.user.id,
          content: req.body.content,
          post: post._id
        });
        post.comments.push(comment.id);
        post.save();
        comment.save();
        return res.json(comment);
      })
      .catch(() => res.json({ msg: "Post bulunamadı." }));
  }
);
//need validation
router.delete(
  "/delete/:c_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.findById(req.params.c_id)
      .then(comment => {
        if (comment.author.toString() === req.user.id.toString())
          return res.json({ msg: "Yorumun sahibi siz değilsiniz" });
        const postid = comment.post;
        const commentid = comment._id;
        Post.findById(postid)
          .then(post => {
            let removeindex = _.findIndex(post.comments, iter => {
              return iter._id.toString() === commentid.toString();
            });
            post.comments.splice(removeindex, 1);
            post.save();
          })
          .catch(() => {
            res.json({ msg: "Gönderi bulunamadı bulunamadı" });
          });
        comment.remove();
        return res.json({ msg: "Yorum silinmiştir." });
      })
      .catch(() => res.json({ msg: "Yorum Bulunamadı" }));
  }
);
router.post(
  "/update/:c_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.findOne({ _id: req.params.c_id })
      .then(comment => {
        if (!(comment.author.toString() === req.user.id.toString())) {
          console.log(req.user.id);
          console.log(comment.author);
          return res.json({ msg: "Bu yorun size ait değil." });
        }
        comment.content = req.body.content;
        comment.save();
        res.json({ msg: "Değişiklik kaydedildi." });
      })
      .catch(() => {
        return res.json({ msg: "Comment bulunamadı" });
      });
  }
);
module.exports = router;
