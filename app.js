const express = require("express");
const dotenv = require("dotenv");


const app = express();
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.status(200).json(
    {
        status: 'success',
        results: 'demo',
        data: {
            "demo": "hello"
        }
    }
);
});


module.exports = app;