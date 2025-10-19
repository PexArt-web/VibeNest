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
      // const actorSocket = userID[userId];
      const authorSocket = userID[vibe.userId.toString()];
      let message = `liked your post`;
      await Notification.create({
        author: vibe.userId.toString(),
        actor: userId,
        type: "like",
        post: vibeId,
        ...(message && { message }),
      });
      log(authorSocket, "liked author socket");
      io.to(authorSocket).emit("likedVibe", {
        message: message,
        post: vibeId,
        actor: userId,
        author: vibe.userId.toString(),
      });
    } catch (error) {
      log(error);
    }
  });

  socket.on("createComment", async ({ userId, docId }) => {
    try {
      if (!userId) {
        log("Action not authorized, please try again");
        throw new Error("Action not authorized, please try again");
      }
      if (!docId) {
        log("vibe not found");
      }
      if (!mongoose.Types.ObjectId.isValid(docId)) {
        log("Invalid vibe ID");
        throw new Error("Invalid Vibe ID");
      }
      const vibe = await Vibe.findById(docId);
      if (!vibe) {
        log("vibe not found");
        throw new Error("Vibe not found");
      }
      // const actorSocket = userID[userId];
      const authorSocket = userID[vibe.userId.toString()];
      const actorName = users[userId];
      let message = `commented on your post`;
      await Notification.create({
        author: vibe.userId.toString(),
        actor: userId,
        type: "comment",
        post: docId,
        ...(message && { message }),
      });
      io.to(authorSocket).emit("commentCreated", {
        message,
        post: docId,
        actor: userId,
        author: vibe.userId.toString(),
      });
    } catch (error) {
      log(error);
    }
  });

  socket.on("postRevibe", async ({ userId, postId }) => {
    try {
      if (!userId) {
        log("Action not authorized, please try again");
        throw new Error("Action not authorized, please try again");
      }
      if (!postId) {
        log("vibe not found");
      }
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        log("Invalid vibe ID");
        throw new Error("Invalid Vibe ID");
      }
      const vibe = await Vibe.findById(postId);
      if (!vibe) {
        log("vibe not found");
        throw new Error("Vibe not found");
      }
      // const actorSocket = userID[userId];
      const authorSocket = userID[vibe.userId.toString()];
      const actorName = users[userId];
      let message = `revibed your post`;
      await Notification.create({
        author: vibe.userId.toString(),
        actor: userId,
        type: "revibe",
        post: postId,
        ...(message && { message }),
      });
      io.to(authorSocket).emit("postRevibed", {
        message,
        post: postId,
        actor: userId,
        author: vibe.userId.toString(),
      });
    } catch (error) {
      log(error);
    }
  });
};

module.exports = { alertPrivateSocket };
