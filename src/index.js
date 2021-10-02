require("./models/User");
require("./models/Track");

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middleware/requireAuth");
const trackRoutes = require("./routes/trackRoutes");

require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error to mongo instance", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
