const User = require("../models/registrationModel");
const { connectdb } = require("../db/index");
const jwt = require("jsonwebtoken");

exports.userRegistration = async function (req, res) {
  await connectdb();
  try {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userExists = await User.exists({
      email: userEmail,
    });

    if (userExists !== null) {
      return res
        .status(200)
        .json({ success: false, message: "User alrady exists!!" });
    } else {
      const newUserCreated = new User({
        firstName: `${firstName} ${lastName}`,
        email: userEmail,
        password: userPassword,
      });
      const userId = newUserCreated._id.toString();
      const userToken = jwt.sign(
        {
          userId: userId,
          randomText: process.env.RANDOM_TEXT,
        },
        process.env.SECRET_KEY
      );

      newUserCreated.auth_key = userToken;
      await newUserCreated.save();

      return res.status(201).json({
        success: true,
        message: "User created successfully!!",
        auth_token: userToken,
      });
    }
  } catch (error) {
    console.log("userRegistration", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
