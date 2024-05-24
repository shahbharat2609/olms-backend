import express from "express";
import {
  carrierDashboard,
  postCarrier,
} from "../controllers/carrierDashboard-controller.js";
import authenticateToken from "../middlewares/jwt-middleware.js";

const router = express.Router();

router.route("/postCarrier").post(authenticateToken, postCarrier);
router.route("/carrierDashboard/:_id").get(authenticateToken, carrierDashboard);

export default router;
