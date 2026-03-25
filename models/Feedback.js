import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Feedback", FeedbackSchema);
