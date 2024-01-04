const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./server/Routers/userRoutes");
const noteRoutes = require("./server/Routers/noteRoutes");
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
// app.use('/api', noteRoutes)

app.get("*", (req, res) => {
  res.status(404).send("404 error");
});

module.exports = app;
