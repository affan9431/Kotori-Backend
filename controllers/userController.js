const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      japaneseLevel: user.japaneseLevel,
      reasonForLearning: user.reasonForLearning,
      timeAvailable: user.timeAvailable,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, level, motivation, time } = req.body;
    if (!fullName || !email || !password || !level || !motivation || !time) {
      return res
        .status(400)
        .json({ status: "fail", message: "Please fill in all fields" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      japaneseLevel: level,
      reasonForLearning: motivation,
      timeAvailable: time,
    });

    const token = getToken(user);

    res.status(201).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
