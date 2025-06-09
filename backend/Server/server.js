require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const userRoutes = require("../Routes/userRoutes");
const vibeRoutes = require('../Routes/vibeRoutes')
const { connectDB } = require("../Config/database");
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/user", vibeRoutes)
app.use((req, res, next)=>{
  res.status(404).json({error: "route not found"})
})

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
