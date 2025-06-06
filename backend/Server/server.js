require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const userRoutes = require("../Routes/userRoutes");
const { connectDB } = require("../Config/database");
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

const { log } = console;

connectDB((error) => {
  if (!error) {
    const server = app.listen(port, () => {
      log(`Server is running on port ${port}`);
      log("app and database connected successfully");
    });
    return;
  } else {
    log(error);
  }
});
