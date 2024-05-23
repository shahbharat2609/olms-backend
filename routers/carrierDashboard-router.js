import express from "express";
import carrierDashboard from "../controllers/carrierDashboard-controller.js";
import authenticateToken from "../middlewares/jwt-middleware.js";

const router = express.Router();

router.route("/carrierDashboard").get(authenticateToken, carrierDashboard);

export default router;
