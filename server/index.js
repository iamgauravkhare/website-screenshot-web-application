const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { databaseConnection } = require("./configuration/database");
const { cloudinaryConnection } = require("./configuration/cloudinary");
const routes = require("./routes/routes");
const PORT = process.env.PORT || 4000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://snap-site.vercel.app",
  "https://snap-site-iamgauravkhare.vercel.app",
  "https://snap-site-git-master-iamgauravkhare.vercel.app",
];
databaseConnection();
cloudinaryConnection();
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    messsage: "Server is running!",
  });
});
app.use("/api/v1", routes);
app.listen(PORT, () => {
  console.log("Server is running!");
});
