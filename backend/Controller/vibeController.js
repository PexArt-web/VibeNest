const Vibe = require("../Models/BluePrint/vibeModel");

const { log } = console;
const createVibe = async (req, res) => {
  try {
    const { content, imageUrl } = req.body;
    const userId = req.user._id;
    if (!userId || !content && !imageUrl) {
      return res.status(400).json({ error: "Content or image is required" });
    }
    const data =  await Vibe.save({userId, content, imageUrl});
    if (!data) {
      return res.status(500).json({ error: "Failed to create vibe" });
    }
    return res.status(200).json({data})
  } catch (error) {
    log(error);
    throw error;
  }
};

module.exports = { createVibe}