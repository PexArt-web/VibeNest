const mongoose = require("mongoose");
const User = require("../Models/BluePrint/userModel");
const Follow = require("../Models/BluePrint/followModel");

const { log } = console;

const followOrUnFollow = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized user, please login again" });
    }
    if (!id) {
      return res.status(400).json({ error: `Invalid user please try again` });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    if (userId === id) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }
    const userToFollowId = await User.findById(id);
    log(userToFollowId, "user to follow");
    const user = await User.findById(userId);
    log(user, "user");
    if (!userToFollowId) {
      return res.status(404).json({ error: "User to follow not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingFollow = await Follow.findOne({
      follower: userId,
      following: id,
    });
    if(existingFollow){
     const deletedFollow = await Follow.deleteOne({ _id: existingFollow._id })
     log(deletedFollow, "deleted follow")

    }else{
      const follow = await Follow.create({follower: userId, following: id})
      log(follow, "follow")
    }
    // existingFollow
    //   ? await Follow.deleteOne({ _id: existingFollow._id })
    //   : await Follow.create({ follower: userId, following: id });
  } catch (error) {
    log(error);
    throw new Error(error);
  }
};

module.exports = {
  followOrUnFollow,
};
