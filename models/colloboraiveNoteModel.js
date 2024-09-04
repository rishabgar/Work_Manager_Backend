const mongoose = require("mongoose");

const userColloborativeNotesSchema = new mongoose.Schema(
  {
    note_id: { type: String, required: [true, "note id is required"] },
    title: { type: String, default: undefined },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    // isTrsahed: { type: Number, required: [true, "Is Trashed Required"] },
    user_id: { type: String, required: [true, "user id is required"] },
    other_user_id: {
      type: String,
      required: [true, "other note id is required"],
    },
  },
  { timestamps: true }
);

module.exports = ColloborativeNote = mongoose.model(
  "ColloborativeNote",
  userColloborativeNotesSchema
);
