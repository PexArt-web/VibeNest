const express = require("express");
const router = express.Router();
const {
  createVibe,
  getVibes,
  deleteVibe,
  getVibeById,
  createComment,
  getComments,
  getVibesWithComments,
} = require("../Controller/vibeController");
const { requireAuth } = require("../Middleware/requireAuth");

router.use(requireAuth);

router.post("/create-vibe", createVibe);

router.get("/get-vibes", getVibes);

router.delete("/delete-vibe/:id", deleteVibe);

// router.get("/get-userVibe/:id", getVibeById)
router.get("/get-userVibe/:id", getVibesWithComments);

router.post("/create-comment/:id", createComment);

router.get("/get-comments/:id", getComments);

module.exports = router;
