import mongoose from "mongoose";

const carrierDashboardSchema = new mongoose.Schema({
  shipperName: {
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

const CarrierDashboard = mongoose.model(
  "CarrierDashboard",
  carrierDashboardSchema
);
export default CarrierDashboard;
