const express = require("express");
const router = express.Router();
const passport = require("passport");
const randomstring = require("../../utils/random");
// Load Classroom model
const Classroom = require("../../models/Classroom.js");

router.get("/test", (req, res) => {
  res.json({ msg: "çalışıyor" });
});
router.post(
  "/create",
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
      .then(classroom => res.json(classroom))
      .catch(err => console.log(err));
  }
);
router.post(
  "/join",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.isteacher === true) {
      return res
        .status(400)
        .json({ msg: "Öğretmenler sınıflara katılamazlar" });
    }
    Classroom.findOne({ secretcode: req.secretcode })
      .then(classroom => {
        classroom.students.push(req.user.id);
        return res.status(200).json(classroom.students);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
