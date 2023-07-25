const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    default : "",
  },
  videoUrl: {
    type: String,
  },
  datePostedOn: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
  // comments: {
  //   type: [
  //     {
  //       userId: { type: String },
  //       comment: { type: String },
  //     },
  //   ],
  //   default: [],
  // },
  tags: {
    type: [String],
  },
  Uploadedby: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("Social", SocialSchema);
