const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const vibeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      // required: true,
      trim: true,
      maxlength: 500,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: null,
      required: false,
    },
    isRevibe:{
      type:Boolean,
      default: false
    },
    originalVibe:{
      type:Schema.Types.ObjectId,
      ref:"Vibe"
    },
    likes : [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = vibeSchema;
