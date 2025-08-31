const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vibeId: {
      type: Schema.Types.ObjectId,
      ref: "Vibe",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    commentReviberId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isRevibe: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = commentSchema;
