const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getRegisterController(req, res) {
  res.render("register");
}

async function postRegisterController(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isUserExists) {
    return res.status(400).json({
      message: "user already exist with this username or email",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.redirect("/");
}

async function getLoginController(req, res) {
  res.render("login");
}

async function postLoginController(req, res) {
  const { identifier, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) {
    return res.redirect("/login?error=User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.redirect("/login?error=Invalid password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.redirect("/");
}

async function userLogout(req, res) {
  res.clearCookie('token');

  return res.redirect("/auth/login");
}

module.exports = {
  getRegisterController,
  postRegisterController,
  getLoginController,
  postLoginController,
  userLogout
};
