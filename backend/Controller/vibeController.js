const Vibe = require("../Models/BluePrint/vibeModel");
const mongoose = require("mongoose");
const Comment = require("../Models/BluePrint/commentModel");
const User = require("../Models/BluePrint/userModel");

const { log } = console;
const createVibe = async (req, res) => {
  try {
    const { content, imageUrl } = req.body;
    const userId = req.user._id;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized user, please login again" });
    }
    if (!content && !imageUrl) {
      return res.status(400).json({ error: "Content or image is required" });
    }
    const data = await Vibe.create({ userId, content, imageUrl });
    if (!data) {
      return res.status(500).json({ error: "Failed to create vibe" });
    }
    return res.status(200).json({ message: "Vibe created successfully", data });
  } catch (error) {
    throw error;
  }
};

const getWholeVibes = async (req, res) => {
  try {
    // coming back to understand this properly
    const vibes = await Vibe.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "vibeId",
          as: "comment",
        },
      },
      {
        $addFields: {
          commentCount: { $size: { $ifNull: ["$comment", []] } },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },

      //  Getting the original vibe if it's a reVibe
      {
        $lookup: {
          from: "vibes",
          localField: "originalVibe",
          foreignField: "_id",
          as: "originalVibeData",
        },
      },
      {
        $unwind: {
          path: "$originalVibeData",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Now get the user who posted the originalVibe
      {
        $lookup: {
          from: "users",
          localField: "originalVibeData.userId",
          foreignField: "_id",
          as: "originalVibeData.user",
        },
      },
      {
        $unwind: {
          path: "$originalVibeData.user",
          preserveNullAndEmptyArrays: true,
        },
      },
      // now getting comments that was revibed to a normal vibe
      {
        $lookup: {
          from: "comments",
          localField: "commentId",
          foreignField: "_id",
          as: "originalCommentData",
        },
      },
      {
        $unwind: {
          path: "$originalCommentData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "originalCommentData.userId",
          foreignField: "_id",
          as: "originalCommentData.user",
        },
      },
      {
        $unwind: {
          path: "$originalCommentData.user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          comment: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res
      .status(200)
      .json({ message: "vibe fetched successfully", vibes });
  } catch (error) {
    log("error fetching vibes", error);
    return res.status(500).json({ message: "error fetching vibes", error });
  }
};

const getVibeById = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid vibe ID" });
    }

    const vibe = await Vibe.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "vibeId",
          as: "comment",
        },
      },
      {
        $addFields: {
          commentCount: { $size: { $ifNull: ["$comment", []] } },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },

      //  Getting the original vibe if it's a reVibe and getting comments too
      {
        $lookup: {
          from: "vibes",
          localField: "originalVibe",
          foreignField: "_id",
          as: "originalVibeData",
        },
      },
      {
        $unwind: {
          path: "$originalVibeData",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Now get the user who posted the originalVibe
      {
        $lookup: {
          from: "users",
          localField: "originalVibeData.userId",
          foreignField: "_id",
          as: "originalVibeData.user",
        },
      },
      {
        $unwind: {
          path: "$originalVibeData.user",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          comment: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    const comment = await Comment.find({ vibeId: _id })
      .populate("userId")
      .sort({ createdAt: -1 });
    if (!vibe) {
      return res.status(404).json({ error: "Vibe not found" });
    }
    return res
      .status(200)
      .json({ message: "Vibe fetched successfully", vibe, comment });
  } catch (error) {
    log("Error fetching vibe:", error);
    return res.status(500).json({ error: "Failed to fetch vibe" });
  }
};

const deleteVibe = async (req, res) => {
  try {
    const vibeId = req.params.id;
    const userId = req.user._id;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized user, please login again" });
    }
    const vibe = await Vibe.findById(vibeId);
    if (!vibe) {
      return res.status(404).json({ error: "Vibe not found" });
    }
    const deleteDoc = await Vibe.findByIdAndDelete(vibeId);
    return res.status(200).json({ message: "Vibe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete vibe" });
  }
};

const reVibe = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const content = req.body.content;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized user, please login again" });
    }
    if (!id) {
      return res.status(400).json({ error: "Invalid or Missing VibeId" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Vibe ID" });
    }

    const original = await Vibe.findById(id);
    if (!original) {
      return res.status(404).json({ error: "Original vibe not found" });
    }

    const isAlreadyRevibed = original.reViberId.some(
      (reviberId) => reviberId.toString() === userId.toString()
    );

    if (isAlreadyRevibed) {
      original.reViberId = original.reViberId.filter(
        (reviber) => reviber.toString() !== userId.toString()
      );
      await original.save();
      const deletedReVibe = await Vibe.findOneAndDelete({
        userId,
        originalVibe: id,
      });
      return res.status(200).json({ message: "Revibe removed successfully" });
    } else {
      original.reViberId.push(userId);
      await original.save();
    }

    const reVibeData = {
      userId,
      isRevibe: true,
      originalVibe: id,
      ...(content && { content }),
    };
    const reVibed = await Vibe.create(reVibeData);
    if (!reVibed) {
      return res.status(500).json({ error: `Failed to revibe, ${reVibed}` });
    }
    return res
      .status(200)
      .json({ message: "Post reVibed successfully", reVibed });
  } catch (error) {
    log(error);
    return res.status(500).json({ error: `Error revibg the vibe, ${error}` });
  }
};

const likeOrUnlikeVibe = async (req, res) => {
  try {
    const userId = req.user._id;
    const { vibeId } = req.params;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Action not authorized , please try again" });
    }
    if (!vibeId) {
      return res.status(500).json({ message: "vibe not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(vibeId)) {
      return res.status(400).json({ error: "Invalid Vibe ID" });
    }
    const vibe = await Vibe.findById(vibeId);
    if (!vibe) {
      return res.status(500).json({ message: "vibe not found" });
    }
    const liked = vibe.likes.some((id) => id.toString() === userId.toString());
    if (liked) {
      vibe.likes = vibe.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      vibe.likes.push(userId);
    }

    await vibe.save();

    return res.status(200).json({
      message: liked ? "Vibe Unliked successfully" : "Vibe liked Successfully",
      likesCount: vibe.likes.length,
      liked: !liked,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error liking Post , try again" });
  }
};

const vibeUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    log(id, "userID");
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized user, please login again" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    if (!id) {
      return res.status(400).json({ error: `Invalid user please try again` });
    }

    const vibes = await Vibe.find({ userId: id })
      .populate("userId")
      .sort({ createdAt: -1 });
    const user = await User.findOne({ _id: id });
    log(user, "user profile");
    return res
      .status(200)
      .json({
        message: "User vibes fetched successfully",
        vibes,
        userId,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching user vibes", error });
  }
};

module.exports = {
  createVibe,
  deleteVibe,
  getVibeById,
  getWholeVibes,
  reVibe,
  likeOrUnlikeVibe,
  vibeUserProfile,
};
