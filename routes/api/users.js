const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');
const Classroom = require('../../models/Classroom');

// @route GET api/users/test
// desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'User calısıyor' }));

// @route GET api/users/register
// desc Kullanıcıyı kayıt et
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ error: 'Email zaten kullanımdadır.' });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', //Rating
        d: 'mm', //Default image
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        password: req.body.password2,
        isteacher: req.body.isteacher,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
// @route GET api/users/login
// desc Login User
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'Geçersiz e-posta girdiniz';
        return res.status(404).json(errors);
      }

      // Şifreyi kontrol et
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // Kullanıcının şifresi doğru
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            isteacher: user.isteacher,
          };

          //Token ver
          jwt.sign(payload, keys.secretOrKey, { expiresIn: 360000 }, (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          });
        } else {
          errors.password = 'Şifre yanlış';
          return res.status(400).json(errors);
        }
      });
    })
    .catch((err) => console.log(err));
});
// @route GET api/users/currentuser
// desc Kullanıcının bilgilerini bul
// @access Private
router.get('/currentuser', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    isteacher: req.user.isteacher,
  });
});
// @route GET api/users/getuserclass
// desc Kullanıcının dahil olduğu sınıfları bul
// @access Private

router.get('/getuserclass', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate({
      path: 'classes',
      populate: { path: 'teacherid' },
    });
    const result = user.classes.map((userClass) => ({
      classid: userClass._id,
      name: userClass.name,
      teachername: userClass.teacherid && userClass.teacherid.name,
      avatar: userClass.teacherid && userClass.teacherid.avatar,
    }));
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
