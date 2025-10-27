const express = require("express");
const router = express.Router();
const {
  createVibe,
  deleteVibe,
  getVibeById,
  getWholeVibes,
  reVibe,
  likeOrUnlikeVibe,
  vibeUserProfile,
} = require("../Controller/vibeController");
const { requireAuth } = require("../Middleware/requireAuth");

router.use(requireAuth);

router.post("/create-vibe", createVibe);

router.get("/get-vibes", getWholeVibes);

router.delete("/delete-vibe/:id", deleteVibe);

router.get("/get-userVibe/:id", getVibeById);

router.post("/:id/revibe", reVibe);

router.post("/:vibeId/like", likeOrUnlikeVibe);

router.get("/user-profile/:id", vibeUserProfile);

module.exports = router;
