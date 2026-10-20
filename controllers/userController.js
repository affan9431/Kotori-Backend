const User = require("../models/userModel");

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
    console.log("User created successfully:", user);

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
