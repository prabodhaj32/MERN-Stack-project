import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRouter.js"; // Import the routes file

// Create an Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Set the port from environment variables or default to 7000
const PORT = process.env.PORT || 7000;

// Get the MongoDB connection URL from environment variables
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB and start the server
mongoose
  .connect("mongodb://127.0.0.1:27017/mern", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully.");
    
    // Use the defined routes
   app.use("/api", route);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
