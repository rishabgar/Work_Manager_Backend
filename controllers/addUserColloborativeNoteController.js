const ColloborativeNote = require("../models/colloboraiveNoteModel");
const User = require("../models/registrationModel");
const { connectdb } = require("../db/index");
const Note = require("../models/noteModel");
const jwt = require("jsonwebtoken");

exports.addCollaborativeNotes = async function (req, res) {
  await connectdb();
  try {
    const title = req.body.title;
    const description = req.body.description;
    const nodeId = req.body.note_id;
    const emailId = req.body.email_id;
    const auth_key = req.headers.authorization;
    const decodedAuthKey = jwt.verify(auth_key, process.env.SECRET_KEY);

    // Getting User Id from decoded auth key
    const userId = decodedAuthKey?.userId;
    const userData = await User.find({ email: emailId }, "_id");

    // Checking email id is present or not
    if (userData?.length > 0) {
      await Note.deleteOne({ note_id: nodeId });
      const otherUserId = userData[0]._id.valueOf();
      const newUserNoteCreated = new ColloborativeNote({
        title: title ? title : undefined,
        description: description,
        note_id: nodeId,
        other_user_id: otherUserId,
        user_id: userId,
      });

      const data = await newUserNoteCreated.save();

      if (data) {
        return res.status(200).json({
          success: true,
          message: "Note Added Successfully",
          allNote: {
            note_id: data.note_id,
            title: data.title,
            description: data.description,
            user_id: data.user_id,
            otherUserId: data.other_user_id,
          },
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "Note not Added",
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
