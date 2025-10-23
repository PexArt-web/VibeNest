const mongoose = require("mongoose")
const followSchema = require("../Schema/followSchema")
const Follow = mongoose.model("Follow", followSchema)
module.exports = Follow;