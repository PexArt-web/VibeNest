const express = require("express");
const router = express.Router();
const {
  createVibe,
  deleteVibe,
  getVibeById,
  // createComment,
  // getComments,
  getWholeVibes,
  reVibe,
  likeOrUnlikeVibe,
  vibeUserProfile,
  // commentLikeOrUnlike,
  // commentRevibe,
} = require("../Controller/vibeController");
const { requireAuth } = require("../Middleware/requireAuth");

router.use(requireAuth);

router.post("/create-vibe", createVibe);

router.get("/get-vibes", getWholeVibes);

router.delete("/delete-vibe/:id", deleteVibe);

router.get("/get-userVibe/:id", getVibeById)

// router.post("/create-comment/:id", createComment);

// router.get("/get-comments/:id", getComments);

router.post("/:id/revibe", reVibe)

router.post("/:vibeId/like", likeOrUnlikeVibe);

router.get("/user-profile/:id", vibeUserProfile);

// router.post("/comment/:commentId/like", commentLikeOrUnlike);

// router.post("/comment/:commentId/reply", commentRevibe);

module.exports = router;
