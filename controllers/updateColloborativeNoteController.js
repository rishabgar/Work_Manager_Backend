const { connectdb } = require("../db/index");
const ColloborativeNote = require("../models/colloboraiveNoteModel");

exports.updateColloborativeNote = async function (req, res) {
  await connectdb();
  try {
    const noteId = req.body.note_id;
    const title = req.body.title;
    const description = req.body.description;

    // Getting User Id from decoded auth key
    const updatedNote = await ColloborativeNote.findOneAndUpdate(
      { note_id: noteId },
      { title: title, description: description },
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
