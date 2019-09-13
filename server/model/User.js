const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

let userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  name: String,
  email: String,
  password: String
});

userSchema.methods.checkPassword = async function(password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const validateUser = user => {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(20),
    email: Joi.string()
      .min(5)
      .max(255)
      .email(),
    password: Joi.string()
      .min(8)
      .max(255)
  };
  return Joi.validate(user, schema);
};

mongoose.model("User", userSchema);

exports.validateUser = validateUser;
