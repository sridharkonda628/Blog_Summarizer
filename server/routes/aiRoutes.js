import express from "express";
import { summarizeBlog } from "../controllers/aiController.js";

const router = express.Router();
router.post("/api/summarize", summarizeBlog);

export default router;
