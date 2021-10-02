const express = require("express");

const authRoutes = express.Router();

authRoutes.post("/signup", (req, res) => {
  res.send("You made a post request");
});

module.exports = authRoutes;
