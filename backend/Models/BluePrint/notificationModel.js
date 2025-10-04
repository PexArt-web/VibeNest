const mongoose = require("mongoose");
const notificationSchema = require("../Schema/notificationSchema");

const Notification = mongoose.model("Notifications", notificationSchema);

module.exports = Notification;
