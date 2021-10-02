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

module.exports = router;
