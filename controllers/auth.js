const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config() ; 

exports.signup = async (req, res) => {
  try {
    // get data
    const { email, firstname, lastname, password } = req.body;

    // validation

    if (!email || !firstname || !lastname || !password) {
      return res.status(400).json({
        message: "pls enter all the data",
        success: false,
      });
    }

    // if user already exist

    const user = await User.findOne({ email });

    if (user) {
      // console.log("user exist");
      return res.status(400).json({
        message: "User Already exist",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const userDetail = await User.create({
      firstname,
      lastname,
      email,
      password: hashpassword,
      profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
    });

    // console.log(userDetail);

    return res.status(200).json({
      message: "sign in successfull",
      user: userDetail,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "pls enter full info",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "pls sign up",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "wrong password",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    const option = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, option).status(200).json({
      token,
      user,
      message: "done login",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};
