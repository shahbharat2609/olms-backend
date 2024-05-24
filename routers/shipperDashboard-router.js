import express from "express";
import {
  postShipper,
  shipperDashboard,
} from "../controllers/shipperDashboard-controller.js";
import authenticateToken from "../middlewares/jwt-middleware.js";

const router = express.Router();

router.route("/postShipper").post(authenticateToken, postShipper);
router.route("/shipperDashboard/:_id").get(authenticateToken, shipperDashboard);

export default router;
