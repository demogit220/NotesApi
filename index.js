const express = require("express");
const dotenv = require("dotenv");
dotenv.config(".env");

const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })