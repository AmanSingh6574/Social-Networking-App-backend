const User = require("../models/User");
const Social = require("../models/Social")
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId).populate("Post").exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "Cannot get user profile",
    });
  }
};


// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // Retrieve the existing user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    // Update only the fields that are present in the request
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        user[key] = updates[key];
      }
    });
    const profileImageUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstname} ${user.lastname}`;

    // Update the user's profileImage field in the database
    await User.updateOne(
      { _id: userId },
      { $set: { profileImage: profileImageUrl } }
    );
    const updatedUser = await user.save();
    await Social.updateMany({ userId: userId }, { $set: { Uploadedby: `${user.firstname} ${user.lastname}` } });
    // console.log(updatedUser)
    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "Cannot update user profile",
    });
  }
};
