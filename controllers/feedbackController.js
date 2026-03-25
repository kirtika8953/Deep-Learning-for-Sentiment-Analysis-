import Feedback from "../models/Feedback.js";
import { analyzeSentiment } from "../utils/sentiment.js";

// ADD FEEDBACK
export const addFeedback = async (req, res) => {
  try {
    const { text } = req.body;

    const sentiment = analyzeSentiment(text);

    const feedback = await Feedback.create({
      userId: req.userId,
      text,
      sentiment
    });

    res.json({ success: true, feedback });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get All Feedback for Dashboard
export const getFeedback = async (req, res) => {
  try {
    const data = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
