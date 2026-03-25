import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Feedback from "./models/Feedback.js";

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose
  .connect("mongodb://127.0.0.1:27017/sentimentx")
  .then(() => console.log("✔ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ROUTE — SAVE FEEDBACK
app.post("/api/feedback", async (req, res) => {
  console.log("📥 Incoming Feedback:", req.body);

  try {
    const { fullName, department, email, message } = req.body;

    // VALIDATION
    if (!fullName || !department || !email || !message) {
      console.log("❌ Missing field detected");
      return res.status(400).json({ success: false, error: "All fields required" });
    }

    const saved = await Feedback.create(req.body);
    console.log("✔ Feedback Saved:", saved);

    res.json({ success: true, message: "Feedback stored successfully", data: saved });
  } catch (err) {
    console.log("🔥 ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// START SERVER
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
