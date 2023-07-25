const mongoose = require("mongoose");
const Social = require("../models/Social");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/ImageUploader");

exports.addPost = async (req, res) => {
  try {
    let { description, tags } = req.body;
    cconst file = req.files?.file || null;
    const userId = req.user.id;
    // console.log(file)

    let FileUpload = {};

    if (file) {
      FileUpload = await uploadImageToCloudinary(
        file,
        process.env.FOLDER_NAME,
        1000,
        1000
      );
    }

    const Tags = JSON.parse(tags);

    // console.log('FileUpload' , FileUpload);
    const user = await User.findById(userId);

    const Username = `${user?.firstname} ${user?.lastname} `;

    const PostData = await Social.create({
      description: description,
      imageUrl: FileUpload.secure_url || null,
      datePostedOn: Date.now(),
      tags: Tags,
      Uploadedby: Username,
      userId: userId,
    });

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          Post: PostData._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Post successfully`,
      data: PostData,
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "file not uploaded",
      success: false,
    });
  }
};

exports.getallpost = async (req, res) => {
  try {
    const allPost = await Social.find({});
    return res.status(200).json({
      data: allPost,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Could not get all post",
    });
  }
};

exports.VoteFunc = async (req, res) => {
  try {
    const { postId, value } = req.body;
    const userId = req.user.id; // Assuming you have middleware that populates the user information

    const isPost = await Social.findById(postId);
    if (!isPost) return res.status(404).json({ message: "Post not found" });

    const isLiked = isPost.likes.includes(userId);
    const isDisliked = isPost.dislikes.includes(userId);

    if (value === "upVote") {
      isPost.likes = isLiked
        ? isPost.likes.filter((id) => id !== userId)
        : [...isPost.likes, userId];
      if (isDisliked)
        isPost.dislikes = isPost.dislikes.filter((id) => id !== userId);
    } else if (value === "downVote") {
      isPost.dislikes = isDisliked
        ? isPost.dislikes.filter((id) => id !== userId)
        : [...isPost.dislikes, userId];
      if (isLiked) isPost.likes = isPost.likes.filter((id) => id !== userId);
    }

    await isPost.save(); // Save the changes to the database
    res.status(200).json({ message: "Voted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


exports.deletePost = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post unavailable");
  }

  try {
    // console.log(_id, userId);
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.updateOne({ $pull: { Post: _id } });
    await Social.findByIdAndRemove(_id);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
