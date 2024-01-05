const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./server/Routers/userRoutes");
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());
app.use(cookieParser());

const apiLimiter = rateLimit({
  windowMs: 60*1000,
  max: 5
})

app.use("/api", apiLimiter, userRoutes);


app.get("*", (req, res) => {
  res.status(404).send("404 error");
});

module.exports = app;
