const mongoose = require("mongoose");
const Vibe = require("../../Models/BluePrint/vibeModel");
const { log } = console;
// for private notifications

let userID = {};
let users = {};
const alertPrivateSocket = (socket, io) => {
  socket.on("userInfo", ({ id, username }) => {
    userID[id] = socket.id;
    users[id] = username;
    // log(id, username , "from socket")
    // log(userID[id], "user Socket")
  });

  socket.on("likeOrUnlikeVibe", async ({ vibeId, userId }) => {
    try {
      log(vibeId, userId, "user and document to be liked");
      log(`${userId} liked your post with doc Id ${vibeId}`);
      if (!userId) {
        log("Action not authorized, please try again");
        throw new Error("Action not authorized, please try again");
      }
      if (!vibeId) {
        log("vibe not found");
      }
      if (!mongoose.Types.ObjectId.isValid(vibeId)) {
        log("Invalid vibe ID");
        throw new Error("Invalid Vibe ID");
      }
      const vibe = await Vibe.findById(vibeId);
      if (!vibe) {
        log("vibe not found");
        throw new Error("Vibe not found");
      }
      log(vibe, "vibe document to be liked");
      const actorSocket = userID[userId];
      const authorSocket = userID[vibe.userId.toString()];
      const liked = vibe.likes.some(
        (id) => id.toString() === userId.toString()
      );
      if (liked) {
        vibe.likes = vibe.likes.filter(
          (id) => id.toString() !== userId.toString()
        );
      } else {
        vibe.likes.push(userId);
        if (authorSocket) {
          //notify the actor
          log(userId, "actor");
          log(vibe.userId.toString(), "author");
          const actorName = users[userId];
          if (userId === vibe.userId.toString()) {
            log(true)
            io.to(authorSocket).emit("likedVibe", `You liked your post`);
          } else {
            io.to(authorSocket).emit(
              "likedVibe",
              `${actorName} liked your post`
            );
          }
        }
      }
      await vibe.save();
      log({
        message: liked
          ? "Vibe Unliked successfully"
          : "Vibe liked Successfully",
        likesCount: vibe.likes.length,
        liked: !liked,
      });
    } catch (error) {
      log(error);
    }
  });
};

module.exports = { alertPrivateSocket };
