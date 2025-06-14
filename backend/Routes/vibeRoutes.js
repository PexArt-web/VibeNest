const express = require("express");
const router = express.Router();
const {
  createVibe,
  getVibes,
  deleteVibe,
} = require("../Controller/vibeController");
const { requireAuth } = require("../Middleware/requireAuth");

router.use(requireAuth);

router.post("/create-vibe", createVibe);

router.get("/get-vibes", getVibes);

router.delete("/delete-vibe/:id", deleteVibe);
module.exports = router;
