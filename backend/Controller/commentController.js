const mongoose = require("mongoose");
const Comment = require("../Models/BluePrint/commentModel");
const Vibe = require("../Models/BluePrint/vibeModel")

const createComment = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized user, please login again" });
    }
    const { content, imageUrl } = req.body;
    if (!content && !imageUrl) {
      return res.status(400).json({ error: "Content or image is required" });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ error: "Vibe not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid vibe ID" });
    }

    const comment = await Comment.create({
      content,
      imageUrl,
      userId,
      vibeId: id,
    });
    if (!comment) {
      return res.status(500).json({ error: "Failed to create comment" });
    }
    return res
      .status(200)
      .json({ message: "Comment created successfully", comment });
  } catch (error) {
    log("Error creating comment:", error);
    return res.status(500).json({ error: "Failed to create comment" });
  }
};

const getComments = async (req, res) => {
  try {
    const { vibeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(vibeId)) {
      return res.status(400).json({ error: "Invalid vibe ID" });
    }
    const comments = await Comment.find({ vibeId })
      .sort({ createdAt: -1 })
      .populate("userId");
    return res
      .status(200)
      .json({ message: "comment fetched successfully", comments });
  } catch (error) {
    log("Error fetching comments:", error);
    return res.status(500).json({ error: "Failed to fetch comments" });
  }
};

const commentLikeOrUnlike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { commentId } = req.params;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Action not authorized , please try again" });
    }
    if (!commentId) {
      return res.status(500).json({ message: "Comment not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ error: "Invalid Comment ID" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(500).json({ message: "Comment not found" });
    }
    const liked = comment.likes.some(
      (id) => id.toString() === userId.toString()
    );
    if (liked) {
      comment.likes = comment.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      comment.likes.push(userId);
    }

    await comment.save();

    return res.status(200).json({
      message: liked
        ? "Comment Unliked successfully"
        : "Comment liked Successfully",
      likesCount: comment.likes.length,
      liked: !liked,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error liking Comment , try again" });
  }
};

const commentRevibe = async (req, res) => {
  try {
    const userId = req.user._id;
    const { commentId } = req.params;
    const content = req.body.content;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized user, please login again" });
    }
    if (!commentId) {
      return res.status(400).json({ error: "Invalid or Missing CommentId" });
    }
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ error: "Invalid Comment ID" });
    }

    const original = await Comment.findById(commentId);
    if (!original) {
      return res.status(404).json({ error: "Original Comment not found" });
    }

    const isAlreadyRevibed = original.commentReviberId.some(
      (id) => id.toString() === userId.toString()
    );
    if (isAlreadyRevibed) {
      original.commentReviberId = original.commentReviberId.filter(
        (reviber) => reviber.toString() !== userId.toString()
      );
      original.isCommentRevibe = false;
      await original.save();
      const deletedCommentRevibe = await Vibe.findOneAndDelete({
        userId,
        commentId,
      });
      return res
        .status(200)
        .json({ message: "Comment Revibe removed successfully" });
    }

    original.commentReviberId.push(userId);
    await original.save();

    const commentRevibeData = {
      userId,
      isCommentRevibe: true,
      commentId,
      ...(content && { content }),
    };

    const commentRevibe = await Vibe.create(commentRevibeData);
    if (!commentRevibe) {
      return res
        .status(500)
        .json({ error: `Failed to revibe, ${commentRevibe}` });
    }
    return res
      .status(200)
      .json({ message: "Post reVibed successfully", commentRevibe });
  } catch (error) {
    log(error);
    return res.status(500).json({ error: `Error revibg the vibe, ${error}` });
  }
};

module.exports = {
  createComment,
  getComments,
  commentLikeOrUnlike,
  commentRevibe,
};
