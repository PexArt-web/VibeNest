const express = require('express');
const router = express.Router();
const { createVibe, getVibes, deleteVibe } = require('../Controller/vibeController');
const { requireAuth } = require('../Middleware/authMiddleware');

router.use(requireAuth);

router.post("/create-vibe", createVibe)

module.exports = router