const mongoose = require("mongoose");
const Vibe = require("../../Models/BluePrint/vibeModel");
const Notification = require("../../Models/BluePrint/notificationModel");

const { log } = console;
// for private notifications

let userID = {};
let users = {};
const alertPrivateSocket = (socket, io) => {
  socket.on("userInfo", ({ id, username }) => {
    userID[id] = socket.id;
    users[id] = username;
  });

  socket.on("likeOrUnlikeVibe", async ({ vibeId, userId }) => {
    try {
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
      let message;

      const liked = vibe.likes.some(
        (id) => id.toString() === userId.toString()
      );
      if (liked) {
        vibe.likes = vibe.likes.filter(
          (id) => id.toString() !== userId.toString()
        );
      } else {
        vibe.likes.push(userId);

        //notify the actor
        const actorName = users[userId];
        if (userId === vibe.userId.toString()) {
          message = `liked your post`;
          io.to(authorSocket).emit("likedVibe", {
            type: "like",
            message,
            actor: users[userId],
            postId: vibeId,
          });
        } else {
          message = ` liked your post`;
          io.to(authorSocket).emit("likedVibe", {
            type: "like",
            message,
            actor: users[userId],
            postId: vibeId,
          });
        }
      }
      await vibe.save();
      const data = await Notification.create({
        author: vibe.userId.toString(),
        actor: userId,
        type: "like",
        post: vibeId,
        ...(message && { message }),
      });
      // log({
      //   message: liked
      //     ? "Vibe Unliked successfully"
      //     : "Vibe liked Successfully",
      //   likesCount: vibe.likes.length,
      //   liked: !liked,
      // });
    } catch (error) {
      log(error);
    }
  });
};

module.exports = { alertPrivateSocket };
