const mongoose = require("mongoose");
const vibeSchema = require("../Schema/vibeSchema");
const Vibe = mongoose.model("Vibe", vibeSchema);
module.exports = Vibe;
