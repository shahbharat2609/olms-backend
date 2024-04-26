import "dotenv/config";
import express from "express";
import authRoute from "./routers/auth-router.js";
import contactRoute from "./routers/contact-router.js";
import shipmentRoute from "./routers/shipment-router.js";
import connectDb from "./utils/db.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", () => {
  console.log("WELCOME TO BACKEND");
});
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/shipper", shipmentRoute);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT} ✅`);
  });
});
