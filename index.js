import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from './Routes/authRoutes.js'
import userRoutes from './Routes/userRoutes.js'
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});



// Connect to MongoDB
mongoose
  .connect("mongodb+srv://dribbleapp:cUKoKhuVYWxZbb1B@cluster0.5xoyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("data connected success");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  })
  .catch(() => {
    console.log("failed");
  });

// Use routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

