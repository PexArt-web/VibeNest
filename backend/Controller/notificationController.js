const mongoose = require("mongoose");
const Notification = require("../Models/BluePrint/notificationModel");

const { log } = console;

const fetchNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    log(userId, "user Id")
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized user, please login again" });
    }
    const notifications = await Notification.find({ author: userId})
      .populate("actor")
      .sort({ createdAt: -1 });

    return res.status(200).json(notifications);
  } catch (error) {
    log(error);
    return res
      .status(500)
      .json({ message: "Error fetching user notifications", error });
  }
};

module.exports = {
  fetchNotifications,
};
