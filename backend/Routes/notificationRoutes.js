const express = require("express");
const { requireAuth } = require("../Middleware/requireAuth");
const { fetchNotifications } = require("../Controller/notificationController");
const router = express.Router();

router.use(requireAuth);

router.get("/notifications", fetchNotifications);

module.exports = router
