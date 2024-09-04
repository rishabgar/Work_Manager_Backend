// const Note = require("../models/noteModel");
// const { connectdb } = require("../db/index");
// // const { validationResult } = require("express-validator");

// exports.addCollaborativeNotes = async function (req, res) {
//   await connectdb();
//   try {
//     const title = req.body.title;
//     const description = req.body.description;
//     const nodeId = req.body.note_id;
//     const trashed = req.body.trashed;

//     const newUserNoteCreated = new Note({
//       title: title ? title : undefined,
//       description: description,
//       note_id: nodeId,
//       isTrsahed: trashed,
//     });

//     const data = await newUserNoteCreated.save();

//     if (data) {
//       return res.status(200).json({
//         message: "Note Added Successfully",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//       Error: `Error:${error.message}`,
//     });
//   }
// };

const Note = require("../models/noteModel");
const { connectdb } = require("../db/index");
const jwt = require("jsonwebtoken");

exports.addCollaborativeNotes = async function (req, res) {
  await connectdb();
  try {
    const title = req.body.title;
    const description = req.body.description;
    const nodeId = req.body.note_id;
    const trashed = req.body.trashed;
    const auth_key = req.headers.authorization;
    const decodedAuthKey = jwt.verify(auth_key, process.env.SECRET_KEY);
    // Getting User Id from decoded auth key
    const userId = decodedAuthKey?.userId;

    const newUserNoteCreated = new Note({
      title: title ? title : undefined,
      description: description,
      note_id: nodeId,
      isTrsahed: trashed,
      user_id: userId,
    });

    const data = await newUserNoteCreated.save();

    if (data) {
      return res.status(200).json({
        success: true,
        message: "Note Added Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      Error: `Error:${error.message}`,
    });
  }
};
