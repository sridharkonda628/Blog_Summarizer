// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import blogRoutes from "./routes/blogRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => res.send("API is working!"));

// app.use("/api/blogs", blogRoutes);
// app.use("/api/ai", aiRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("MongoDB connection error:", err));

// app.listen(3000,(req,res)=>{
//   console.log("Server is running on port 3000");
//   res.("Server started runnin on port 3000");
// });

// // ❗ DO NOT call app.listen() here
// export default app;

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/api", (req, res) => {
  res.send("API is working!");
});

app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  // Start server only after DB connection
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("Connection error:", error.message);
});
