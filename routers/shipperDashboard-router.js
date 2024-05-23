import express from "express";
import shipperDashboard from "../controllers/shipperDashboard-controller.js";
import authenticateToken from "../middlewares/jwt-middleware.js";

const router = express.Router();

router.route("/shipperDashboard").get(authenticateToken, shipperDashboard);

export default router;
