const Vibe = require("../Models/BluePrint/vibeModel");
const mongoose = require("mongoose");

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

module.exports = { createVibe, getVibes, deleteVibe, getVibeById };
