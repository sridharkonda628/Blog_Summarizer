import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is working!"));

app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// ❗ DO NOT call app.listen() here
export default app;
