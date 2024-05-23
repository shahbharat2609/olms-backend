import mongoose from "mongoose";

const shipperDashboardSchema = new mongoose.Schema({
  carrierName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  shipmentType: {
    type: String,
    required: true,
  },
  shipmentWeightVolume: {
    type: String,
    required: true,
  },
  pickupDateTime: {
    type: Date,
    required: true,
  },
  deliveryDateTime: {
    type: Date,
    required: true,
  },
  bidAmount: {
    type: String,
    required: true,
  },
});

const ShipperDashboard = mongoose.model(
  "shipperDashboard",
  shipperDashboardSchema
);
export default ShipperDashboard;
