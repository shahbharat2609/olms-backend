import Shipment from "../models/shipment-model.js";
import User from "../models/user-model.js";

const shipperShipmentData = async (req, res) => {
  try {
    let {
      shipperId,
      origin,
      destination,
      shipmentType,
      shipmentWeightVolume,
      pickupDateTime,
      deliveryDateTime,
      addDetails,
    } = req.body;

    const { username, email, address, phone } = await User.findById(shipperId);
    const shipmentData = {
      shipperId: shipperId,
      shipperName: username,
      shipperPhone: phone,
      shipperEmail: email,
      shipperAddress: address,
      origin: origin,
      destination: destination,
      shipmentType: shipmentType,
      shipmentWeightVolume: shipmentWeightVolume,
      pickupDateTime: pickupDateTime,
      deliveryDateTime: deliveryDateTime,
      addDetails: addDetails,
    };

    await Shipment.create(shipmentData);

    return res.status(201).json({
      msg: "Shipment details added successfully",
    });
  } catch (err) {
    console.error("❌ Error adding shipment details ❌:", err);
    return res
      .status(500)
      .json({ msg: "Failed to add shipment details", error: err.message });
  }
};

const carrierBidData = async (req, res) => {
  try {
    let {
      userId,
      shipperId,
      shipperName,
      shipperEmail,
      shipperPhone,
      shipperAddress,
      origin,
      destination,
      shipmentType,
      shipmentWeightVolume,
      pickupDateTime,
      deliveryDateTime,
      addDetails,
      bidAmount,
    } = req.body;
    const { username, email, address, phone } = await User.findById(userId);
    const shipmentData = {
      shipperId: shipperId,
      shipperName: shipperName,
      shipperPhone: shipperPhone,
      shipperEmail: shipperEmail,
      shipperAddress: shipperAddress,
      origin: origin,
      destination: destination,
      shipmentType: shipmentType,
      shipmentWeightVolume: shipmentWeightVolume,
      pickupDateTime: pickupDateTime,
      deliveryDateTime: deliveryDateTime,
      addDetails: addDetails,
    };
    const carrierDetails = {
      carrierName: username,
      carrierPhone: phone,
      carrierEmail: email,
      carrierAddress: address,
      bidAmount: bidAmount,
    }
    const updatedShipment = await Shipment.findOneAndUpdate(
      shipmentData, 
      { $set: carrierDetails }, 
      { new: true } 
    );

    if (updatedShipment) {
      return res.status(200).json({
        msg: "carrierBidData updated successfully",
      });
    } else {
      return res.status(404).json({
        msg: "No matching shipment record found",
      });
    }
  } catch (error) {
    console.error("❌ Error adding carrierBidData ❌:", error);
    res.status(500).json({ msg: "Error in fetching carrierBidData data" });
  }
};

const dashboardData = async (req, res) => {
  try {
    let shipmentDashboardData = await Shipment.find().select("-__v");
    return res
      .status(200)
      .json({ msg: "Message sent successfully", data: shipmentDashboardData });
  } catch (error) {
    console.error("❌ Error retrieving shipmentDashboardData  ❌:", err);
    res.status(500).json({
      msg: "Failed to retrieve shipmentDashboardData ",
      error: err.message,
    });
  }
};
export { shipperShipmentData, carrierBidData, dashboardData };
