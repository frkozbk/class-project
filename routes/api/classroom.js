const express = require("express");
const router = express.Router();
const passport = require("passport");
const randomstring = require("../../utils/random");

//Lodash
const _ = require("lodash");
//  Classroom model'ini import et
const Classroom = require("../../models/Classroom.js");
const Post = require("../../models/Post");
const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.json({ msg: "çalışıyor" });
});
// @route   POST api/classroom/create/
// @desc    Sınıf oluştur
// @access  Private
// need validation
router.post("/create",
passport.authenticate("jwt", { session: false }),
 (req, res) => {
  if (!req.user.isteacher) {
    return res.status(400).json({ msg: "Sınıf açma izniniz yok" });
  }
  const name = req.body.name;
  const teacherid = req.user.id;
  const newClassroom = new Classroom({
    name,
    teacherid,
    secretcode: randomstring()
  });
  newClassroom
    .save()
    .then(classroom => {
      User.findOne({ _id: req.user.id }).then(user => {
        user.classes.push(classroom.id);
        user.save();
        res.json({ secretCode: classroom.secretcode});
      });
    })
    .catch(err => console.log(err));


});
// @route   POST api/classroom/join/
// @desc    Sınıfa katıl
// @access  Private
// need validation
router.post(
  "/join",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id;
    const secretcode = req.body.secretcode;

    Classroom.findOne({ secretcode: secretcode }).then(classroom => {
      if (!classroom) {
        res.json({ msg: "Geçersiz kod girdiniz" });
      }
      id = classroom.id;
      console.log(id);
    });

    User.findOne({ _id: req.user.id }).then(user => {
      if (_.find(user, item => item === secretcode)) {
        res.json({ msg: "Zaten bu sınıfa kayıtlısınız" });
      }
      user.classes.push(id);
      user.save();
      res.json({ msg: "Sınıfa katıldınız" });
    });
  }
);
// @route   POST api/classroom/leave/:c_id
// @desc    Kullanıcıyı sınıftan kaldır
// @access  Private
// need validation
router.post(
  "/leave/:c_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }).then(
      user => {
        user.classes = user.classes.filter(classID => {
            return classID.toString() !== req.params.c_id
            // return iter !== null || iter._id !== req.params.c_id
        });
        user.save();
        res.json({ msg: "Sınıftan ayrıldınız." });
      }
    ).catch(err => res.json({error:err}))
  }
);
router.get(
    "/getClassroomDetail/:c_id",
    passport.authenticate("jwt", { session: false }),
    (req,res) => {
        const classroomID  = req.params.c_id
        Classroom.findOne({_id :classroomID})
            .then(classroom => {
                res.json({classroom})
            })
            .catch((err) => {
                res.json({msg:'Bir hata oluştu'})
            })
    }
)
module.exports = router;
