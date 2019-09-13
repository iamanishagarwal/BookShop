const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");
const { validateUser } = require("../model/User");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(req.user);
});

router.post("/signup", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.send("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    user = await user.save();
    if (user) {
      req.login(user, err => {
        if (err) return res.send(err);
      });
      return res.send("Success");
    }
  } catch (er) {
    res.send("Something went wrong.");
    console.log(er);
  }
});

router.post("/signin", async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return res.send(error.details[0].message);

  passport.authenticate("local", (error, user, info) => {
    if (error) return res.send(error);
    if (!user) return res.send(info.message);

    req.login(user, err => {
      if (err) return res.send(err);
    });

    return res.send("Success");
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
