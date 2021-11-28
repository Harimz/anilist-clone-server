const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword, profilePic } = req.body;

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords must match.");
  }

  const newUser = await User.create({
    username,
    email,
    password,
    profilePic,
  });

  if (newUser) {
    res.status(201).send({
      user: {
        username: newUser.username,
        pic: newUser.profilePic,
      },
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Could not register user.");
  }
});

module.exports = { registerUser };
