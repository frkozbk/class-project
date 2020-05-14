const express = require('express');
const router = express.Router();
const passport = require('passport');
const randomstring = require('../../utils/random');

//Lodash
const _ = require('lodash');
//  Classroom model'ini import et
const Classroom = require('../../models/Classroom.js');
const Post = require('../../models/Post');
const User = require('../../models/User');

router.get('/test', (req, res) => {
  res.json({ msg: 'çalışıyor' });
});
// @route   POST api/classroom/create/
// @desc    Sınıf oluştur
// @access  Private
// need validation
router.post('/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    if (!req.user.isteacher) return res.status(400).json({ msg: 'Sınıf açma izniniz yok' });
    const { name } = req.body;
    const { id: teacherid } = req.user;
    const newClassroom = new Classroom({
      name,
      teacherid,
      secretcode: randomstring(),
    });
    const classroom = await newClassroom.save();
    const user = await User.findOne({ _id: req.user.id });
    user.classes.push(newClassroom.id);
    await user.save();
    res.json({ secretCode: classroom.secretcode });
  } catch (err) {
    console.log(err);
  }
});
// @route   POST api/classroom/join/
// @desc    Sınıfa katıl
// @access  Private
// need validation
router.post('/join', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { secretcode } = req.body;
    const classroom = await Classroom.findOne({ secretcode });
    if (!classroom) {
      res.json({ msg: 'Geçersiz kod girdiniz' });
    }
    const { id } = classroom;
    const user = await User.findOne({ _id: req.user.id });

    if (_.find(user, (item) => item === secretcode)) {
      res.json({ msg: 'Zaten bu sınıfa kayıtlısınız' });
    }

    user.classes.push(id);
    await user.save();
    res.json({ msg: 'Sınıfa katıldınız' });
  } catch (error) {
    console.log(error);
  }
});
// @route   POST api/classroom/leave/:c_id
// @desc    Kullanıcıyı sınıftan kaldır
// @access  Private
// need validation
router.post('/leave/:c_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    user.classes = user.classes.filter((classID) => classID.toString() !== req.params.c_id);
    user.save();
    res.json({ msg: 'Sınıftan ayrıldınız.' });
  } catch (error) {
    console.log(error);
  }
});
router.get('/getClassroomDetail/:c_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const classroomID = req.params.c_id;
  Classroom.findOne({ _id: classroomID })
    .then((classroom) => {
      res.json({ classroom });
    })
    .catch((err) => {
      res.json({ msg: 'Bir hata oluştu' });
    });
});
module.exports = router;
