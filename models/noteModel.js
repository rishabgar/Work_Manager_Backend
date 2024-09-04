// const mongoose = require("mongoose");

// const userNotesSchema = new mongoose.Schema(
//   {
//     note_id: { type: String, required: [true, "note id is required"] },
//     title: { type: String, default: undefined },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//     },
//     isTrsahed: { type: Number, required: [true, "Is Trashed Required"] },
//     // user_id: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "User",
//     //   required: [true, "Reference user_id is requireds"],
//     // },
//   },
//   { timestamps: true }
// );

// module.exports = Note = mongoose.model("Note", userNotesSchema);

const mongoose = require("mongoose");

const userNotesSchema = new mongoose.Schema(
  {
    note_id: { type: String, required: [true, "note id is required"] },
    title: { type: String, default: undefined },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    isTrsahed: { type: Number, required: [true, "Is Trashed Required"] },
    user_id: { type: String, required: [true, "note id is required"] },
  },
  { timestamps: true }
);

module.exports = Note = mongoose.model("Note", userNotesSchema);
