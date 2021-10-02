const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new User({ email, password });
    await user.save();

    res.send("You made a post request");
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

module.exports = router;
