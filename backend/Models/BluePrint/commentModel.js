const mongoose = require("mongoose");
const commentSchema = require("../Schema/commentSchema");
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
