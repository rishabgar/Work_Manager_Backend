// const ColloborativeNote = require("../models/colloboraiveNoteModel");
// const User = require("../models/registrationModel");
const { connectdb } = require("../db/index");
const Note = require("../models/noteModel");
// const jwt = require("jsonwebtoken");

exports.updateNote = async function (req, res) {
  await connectdb();
  try {
    const noteId = req.body.note_id;
    const isTrash = req.body.is_trashed;

    // Getting User Id from decoded auth key
    const updatedNote = await Note.findOneAndUpdate(
      { note_id: noteId },
      { isTrsahed: isTrash },
      {
        new: true,
      }
    );

    // Checking email id is present or not
    if (updatedNote) {
      return res.status(200).json({
        success: true,
        message: "Note Updated Successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Note Updation Failed",
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
