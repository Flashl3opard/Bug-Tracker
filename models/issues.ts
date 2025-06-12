// models/Issue.js
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
      default: "OPEN",
    },
  },
  { timestamps: true } 
);


const Issue = mongoose.models.Issue || mongoose.model("Issue", issueSchema);

export default Issue;
