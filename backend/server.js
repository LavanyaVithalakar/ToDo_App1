import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import DB connection
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
//import "./utils/emailScheduler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes); // Authentication routes
app.use("/api/tasks", taskRoutes); // Task routes

// Test Route (as shown in the image)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error("MongoDB Connection Error:", error);
  process.exit(1); // Exit process if database connection fails
});