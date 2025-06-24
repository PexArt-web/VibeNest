const Vibe = require("../Models/BluePrint/vibeModel");
const mongoose = require("mongoose");
const Comment = require("../Models/BluePrint/commentModel");

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

const getVibes = async (req, res) => {
  try {
    const vibes = await Vibe.find().sort({ createdAt: -1 }).populate("userId");
    if (!vibes) {
      return res.status(404).json({ error: "No vibes found" });
    }
    return res
      .status(200)
      .json({ message: "Vibes fetched successfully", vibes });
  } catch (error) {
    throw error;
  }
};

const getVibesWithComments = async(req, res) =>{
  try {
    const vibes = await Vibe.aggregate([
      {
        $lookup:{
          from:"Comments",
          localField:"_id",
          foreignField:"vibeId",
          as:"Comment"
        }
      },
      {
        $addFields:{
          commentCount:{$size: "$Comments"}
        }
      },
      {
        $project:{
          comments:0
        }
      },
      {
        $sort:{
          createdAt: -1
        }
      }
    ])
  } catch (error) {
    console.error("error getting vibes", error)
    return res.status(500).json({message:"error fetching vibes" , error})
  }
}

const getVibeById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid vibe ID" });
    }
    const vibe = await Vibe.find({ userId }).populate("userId");
    if (!vibe) {
      return res.status(404).json({ error: "Vibe not found" });
    }
    return res.status(200).json({ message: "Vibe fetched successfully", vibe });
  } catch (error) {
    console.error("Error fetching vibe:", error);
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
    await Vibe.findByIdAndDelete(vibeId);
    return res.status(200).json({ message: "Vibe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete vibe" });
  }
};

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
    const { vibeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(vibeId)) {
      return res.status(400).json({ error: "Invalid vibe ID" });
    }
    if (!vibeId) {
      return res.status(404).json({ error: "Vibe not found" });
    }
    const comment = await Comment.create({ content, imageUrl, userId, vibeId });
    if (!comment) {
      return res.status(500).json({ error: "Failed to create comment" });
    }
    return res
      .status(200)
      .json({ message: "Comment created successfully", comment });
  } catch (error) {
    console.error("Error creating comment:", error);
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
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Failed to fetch comments" });
  }
};

const likeOrUnlikeVibe = async (req, res) => {
  try {
    const { userId } = req.user;
    const { vibeId } = req.params;
    if (!userId) {
      return res
        .status(500)
        .json({ message: "Action not authorized , please try again" });
    }
    if (!vibeId) {
      return res.status(500).json({ message: "vibe not found" });
    }
    const vibe = await Vibe.findById(vibeId);
    if (!vibe) {
      return res.status(500).json({ message: "vibe not found" });
    }
    const liked = vibe.likes.include(userId);
    if (liked) {
      vibe.likes = vibe.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      vibe.likes.push(userId);
    }

    await vibe.save();
    return res
      .status(200)
      .json({
        message: liked
          ? "Vibe Unliked successfully"
          : "Vibe liked Successfully",
        likesCount: vibe.likes.length,
        liked: !liked,
      });
  } catch (error) {
    console.error("Error like this Post", error);
    return res.status(500).json({ message: "Error liking Post , try again" });
  }
};

module.exports = {
  createVibe,
  getVibes,
  deleteVibe,
  getVibeById,
  createComment,
  getComments,
};
