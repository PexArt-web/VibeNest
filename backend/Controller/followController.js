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
    const user = await User.findById(userId);
    if (!userToFollowId) {
      return res.status(404).json({ error: "User to follow not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const toFollow = Follow.find({ following: id });
    const followr = Follow.find({ follower: userId });
    log(toFollow, "to follow");
    log(followr, "followee");
    return;
    const isFollowing = userToFollowId.follower.some(
      (follower) => follower.toString() === userId.toString()
    );
    if (isFollowing) {
      userToFollowId.follower = userToFollowId.follower.filter(
        (follower) => follower.toString() !== userId.toString()
      );
      await userToFollowId.save();
      user.following = user.following.filter(
        (following) => following.toString() !== id.toString()
      );
      await user.save();
      res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      userToFollowId.follower.push(userId);
      user.following.push(id);
      await userToFollowId.save();
      log(user, "user details from follow controller");
      res.status(200).json({ message: "Followed successfully" });
    }
  } catch (error) {
    log(error);
    throw new Error(error);
  }
};

module.exports = {
  followOrUnFollow,
};
