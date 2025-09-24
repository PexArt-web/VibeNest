require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const userRoutes = require("../Routes/userRoutes");
const vibeRoutes = require("../Routes/vibeRoutes");
const commentRoutes = require("../Routes/commentRoutes");
const { connectDB } = require("../Config/database");
const { connectSocket } = require("../Services/weBSocket");
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/vibes", vibeRoutes);
app.use("/api/comments", commentRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "route not found" });
});

const { log } = console;

connectDB((error) => {
  if (!error) {
    const server = app.listen(port, () => {
      log(`socket , app and database connected successfully and the Server is running on port ${port}`);
    });
    //weBSocket Connection
    const io = require("socket.io")(server, {
      cors: {
        origin: ["http://localhost:5173"]
      }
    })
    io.on("connection", (socket)=> connectSocket(socket, io))
    //
    return;
  } else {
    log(`Error connecting to database:, ${error}`);
  }
});
