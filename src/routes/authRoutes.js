const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userID: user._id }, "MY_SECRET_JWT_KEY");
    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(422).send({ error: "Invalid email or password" });
  }

  try {
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_JWT_KEY");
    res.send({ token });
  } catch (error) {
    return res.status(422).send("Invalid email or password");
  }
});

module.exports = router;
