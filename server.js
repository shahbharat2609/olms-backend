import "dotenv/config";
import express from "express";
import authRoute from "./routers/auth-router.js";
import contactRoute from "./routers/contact-router.js";
import carrierDashboard from "./routers/carrierDashboard-router.js";
import shipperDashboard from "./routers/shipperDashboard-router.js";
import colors from "colors";

import connectDb from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
var corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true };
app.use(cors(corsOptions));

app.get("/", () => {
  console.log("WELCOME TO BACKEND");
});

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/dashboard", carrierDashboard);
app.use("/api/dashboard", shipperDashboard);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(
      `✅ Server is running on http://localhost:${PORT} ✅`.rainbow.bold
    );
  });
});
