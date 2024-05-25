import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
  shipperId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  shipperName: {
    type: String,
    required: true,
  },
  shipperEmail: {
    type: String,
    required: true,
  },
  shipperPhone: {
    type: String,
    required: true,
  },
  shipperAddress: {
    type: String,
    required: true,
  },
  carrierName: {
    type: String,
  },
  carrierPhone: {
    type: String,
  },
  carrierEmail: {
    type: String,
  },
  carrierAddress: {
    type: String,
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
  },
  pickupDateTime: {
    type: Date,
  },
  deliveryDateTime: {
    type: Date,
  },
  addDetails: {
    type: String,
  },
  bidAmount: {
    type: String,
  },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;
