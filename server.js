import "dotenv/config";
import express from "express";
import router from "./routers/auth-router.js";
import connectDb from "./utils/db.js";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
