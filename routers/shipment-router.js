import express from "express";
import shipmentDetails from "../controllers/shipment-controller.js";

const router = express.Router();

router.route("/shipmentDetails").post(shipmentDetails);

export default router;
