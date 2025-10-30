const express = require("express");
const router = express.Router();
const { followOrUnFollow } = require("../Controller/followController");
const { requireAuth } = require("../Middleware/requireAuth");

router.use(requireAuth);

router.put("/follow/:id", followOrUnFollow);

module.exports = router;