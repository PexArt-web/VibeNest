const Vibe = require("../Models/BluePrint/vibeModel");

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
    // if (vibe.userId.toString() !== userId.toString()) {
    //   return res.status(403).json({ error: "You are not authorized to delete this vibe" });
    // }
    await Vibe.findByIdAndDelete(vibeId);
    return res.status(200).json({ message: "Vibe deleted successfully" });
  }
  catch (error) {
    return res.status(500).json({ error: "Failed to delete vibe" });
  }
}

module.exports = { createVibe, getVibes, deleteVibe };
