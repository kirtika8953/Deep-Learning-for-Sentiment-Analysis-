import express from "express";
import { addFeedback, getFeedback } from "../controllers/feedbackController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, addFeedback);
router.get("/", requireAuth, getFeedback);

export default router;
