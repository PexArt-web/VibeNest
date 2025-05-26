require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

