import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
  },
  { timestamps: true }
);

export const noteModel = mongoose.model("note", noteSchema);
