const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  profileImage: {
    type: String,
  },
  Post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Social",
    },
  ],
  token: {
    type: String,
  },

  followings: { type: [String], default: [] },
  followers: { type: [String], default: [] },
});

module.exports = mongoose.model("User", UserSchema);
