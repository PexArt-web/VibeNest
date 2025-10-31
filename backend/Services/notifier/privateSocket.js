const mongoose = require("mongoose");
const Vibe = require("../../Models/BluePrint/vibeModel");
const Notification = require("../../Models/BluePrint/notificationModel");
const Comment = require("../../Models/BluePrint/commentModel");

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

  socket.on("commentLiked", async ({ userId, commentId }) => {
    try {
      if (!userId) {
        log("Action not authorized, please try again");
        throw new Error("Action not authorized, please try again");
      }
      if (!commentId) {
        log("vibe not found");
      }
      if (!mongoose.Types.ObjectId.isValid(commentId)) {
        log("Invalid vibe ID");
        throw new Error("Invalid Vibe ID");
      }
      const comment =  await Comment.findById(commentId)
      if(!comment){
        log("comment doc not found")
        throw new error("comment document not found")
      }
      const authorSocket = userID[comment.userId.toString()];
      let message = `liked your comment`;
      await Notification.create({
        author: comment.userId.toString(),
        actor: userId,
        type: "comment-like",
        comment: commentId,
        ...(message && { message }),
      });
      io.to(authorSocket).emit("LikedComment", {
        message,
        comment: commentId,
        actor: userId,
        author: comment.userId.toString(),
      });
    } catch (error) {
      log(error);
    }
  });

  socket.on("commentRevibe", async ({ userId, commentId }) => {
    try {
      if(!userId){
        log("Action not authorized, please try again")
        throw new Error("Action not authorized, please try again")
      }
      if(!commentId){
        log("comment not found")
      }
      if(!mongoose.Types.ObjectId.isValid(commentId)){
        log("Invalid comment ID")
        throw new Error("Invalid Comment ID, unable to revibe")
      }
     const comment = await Comment.findById(commentId)
      if(!comment){
        log("comment doc not found")
        throw new error("comment document not found")
      }
      const authorSocket = userID[comment.userId.toString()];
      let message = `revibed your comment`;
      await Notification.create({
        author: comment.userId.toString(),
        actor: userId,
        type: "comment-revibe",
        comment: commentId,
        ...(message && { message }),
      });
      io.to(authorSocket).emit("RevibedComment", {
        message,
        comment: commentId,
        actor: userId,
        author: comment.userId.toString(),
      });
    } catch (error) {
      log(error)
    }

  })

  socket.on("userFollowed", async ({ followerID, followingId }) => {
    try {
      if(!followerID || !followingId){
        throw new Error("follower and following are required")
      }
      const followingSocket = userID[followingId]
      const followerSocket = userID[followerID]
      // let message = `${users[followerID]} started following you`
      let message = ` started following you`
      await Notification.create({
        author: followingId,
        actor: followerID,
        type: "follow",
        ...(message && { message }),
      })
      io.to(followingSocket).emit("followedUser", {
        message,
        actor: followerID,
        author: followingId
      })

      
    } catch (error) {
      log(error, "follow error")
    }
  })
};

module.exports = { alertPrivateSocket };
