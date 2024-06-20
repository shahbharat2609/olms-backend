import "dotenv/config";
import express from "express";
import authRoute from "./routers/auth-router.js";
import contactRoute from "./routers/contact-router.js";
import shipmentRoute from "./routers/shipment-router.js";
import cookieParser from "cookie-parser";
import colors from "colors";

import connectDb from "./utils/db.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("WELCOME TO BACKEND");
});

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/shipment", shipmentRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(
      `✅ Server is running on http://localhost:${PORT} ✅`.rainbow.bold
    );
  });
});
