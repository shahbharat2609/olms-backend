import express from "express";
import authenticateToken from "../middlewares/jwt-middleware.js";
import {
  carrierBidData,
  dashboardData,
  shipperShipmentData,
  pdfDownload,
  paymentId
} from "../controllers/shipment-controller.js";

const router = express.Router();

router.route("/loadPosting").post(authenticateToken, shipperShipmentData);
router.route("/bidPortal").post(authenticateToken, carrierBidData);
router.route("/payment").post(authenticateToken, paymentId);
router.route("/download").post(authenticateToken, pdfDownload);

router.route("/dashboard").get(authenticateToken, dashboardData);

export default router;
