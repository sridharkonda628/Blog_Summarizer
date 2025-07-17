// api/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http"; // 👈 NEW
import { createServerlessExpressHandler } from '@vendia/serverless-express';



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

// 👇 Export wrapped Express handler
// export const handler = serverless(app);
export default createServerlessExpressHandler(app);
// ✅ Vercel needs this
 // for Vercel


// // import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import blogRoutes from "./routes/blogRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/blogs", blogRoutes);
// app.use("/api/ai", aiRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(5000, () => console.log("Server running on port 5000"));
//   })
//   .catch((err) => console.error(err));
