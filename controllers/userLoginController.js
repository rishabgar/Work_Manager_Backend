// const User = require("../models/registrationModel");
// const { connectdb } = require("../db/index");
// const bcrypt = require("bcryptjs");

// exports.userLogin = async function (req, res) {
//   await connectdb();
//   try {
//     const userEmail = req.body.email;
//     const userPassword = req.body.password;

//     const userExists = await User.findOne(
//       { email: userEmail },
//       "auth_key password"
//     );
//     // console.log("userExists", userExists);

//     if (userExists !== null) {
//       const checkPassword = await bcrypt.compare(
//         userPassword,
//         userExists.password
//       );
//       //   console.log("checkPassword", checkPassword);
//       if (checkPassword) {
//         return res.status(200).json({
//           success: true,
//           message: "User login successfully",
//           auth_token: userExists.auth_key,
//         });
//       }
//       return res.status(401).json({
//         success: false,
//         message: "User password do not match",
//       });
//     }
//     return res.status(404).json({
//       success: true,
//       message: "User with this email not exists",
//     });
//   } catch (error) {
//     console.log("userRegistration", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

const User = require("../models/registrationModel");
const { connectdb } = require("../db/index");
const bcrypt = require("bcryptjs");

exports.userLogin = async function (req, res) {
  await connectdb();
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const userExists = await User.findOne(
      { email: userEmail },
      "auth_key password"
    );
    console.log("userExists", userExists);

    if (userExists !== null) {
      const checkPassword = bcrypt.compare(userPassword, userExists.password);
      //   console.log("checkPassword", checkPassword);
      if (checkPassword) {
        return res.status(200).json({
          success: true,
          message: "User login successfully",
          auth_token: userExists.auth_key,
        });
      }
      return res.status(401).json({
        success: false,
        message: "User password do not match",
      });
    }
    return res.status(404).json({
      success: false,
      message: "User with this email not exists",
    });
  } catch (error) {
    console.log("userRegistration", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
