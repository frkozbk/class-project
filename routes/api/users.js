const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model
const User = require("../../models/User");

// @route GET api/users
// desc Tests users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "User calısıyor" }));

// @route GET api/users/register
// desc Register User
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ error: "Email zaten kullanımdadır." });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", //Rating
        d: "mm" //Default image
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        isteacher: req.body.isteacher
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route GET api/users/login
// desc Login User
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.mail = "Kullanıcı adı yanlış";
        return res.statusMessage(404).json(errors);
      }

      // Şifreyi kontrol et
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Kullanıcının şifresi doğru
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            isteacher: user.isteacher
          };

          //Token ver
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 360000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Şifre yanlış";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => console.log(err));
});
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      isteacher: req.user.isteacher
    });
  }
);
module.exports = router;
