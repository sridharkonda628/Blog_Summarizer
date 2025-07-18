import express from "express";
import { summarizeBlog } from "../controllers/aiController.js";

const router = express.Router();
router.post("/", summarizeBlog);

export default router;
