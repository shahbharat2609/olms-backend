import express from "express";
import authenticateToken from "../middlewares/jwt-middleware.js";
import shipmentDetails from "../controllers/shipment-controller.js";

const router = express.Router();

router.route("/shipmentDetails").post(authenticateToken, shipmentDetails);

export default router;
