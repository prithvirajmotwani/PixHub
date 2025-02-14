import express from "express";
// import cors from "cors";
import databseConnect from "./utils/db.js";
import photosRoutes from "./routes/photos.route.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import eventRoutes from "./routes/event.route.js";
import cloudinary from "cloudinary";
// import fileUpload from "express-fileupload";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    // origin: "https://photohub-myameen.vercel.app", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200,
    exposedHeaders: ["Set-cookie"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

const port = process.env.PORT || 5001;
databseConnect();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.listen(port, () => {
  console.log(`sever is running at port ${port}`);
});
app.use("/api/photos", photosRoutes);
app.use("/api/", eventRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});
