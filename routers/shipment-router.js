import express from "express";
import authenticateToken from "../middlewares/jwt-middleware.js";
import {
  carrierBidData,
  dashboardData,
  shipperShipmentData,
} from "../controllers/shipment-controller.js";

const router = express.Router();

router.route("/loadPosting").post(shipperShipmentData);
router.route("/bidPortal").post(carrierBidData);

router.route("/dashboard").get(dashboardData);

export default router;
