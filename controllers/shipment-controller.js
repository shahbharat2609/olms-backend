import Shipment from "../models/shipment-model.js";

const shipperShipmentData = async (req, res) => {
  try {
    let {
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
    } = req.body;

    let newShipment = await Shipment.create({
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
    });

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
      shipperId,
      shipperName,
      shipperEmail,
      shipperPhone,
      shipperAddress,
      carrierName,
      carrierEmail,
      carrierPhone,
      carrierAddress,
      origin,
      destination,
      shipmentType,
      shipmentWeightVolume,
      pickupDateTime,
      deliveryDateTime,
      addDetails,
      bidAmount,
    } = req.body;
    let loadData = await Shipment.create({
      shipperId,
      shipperName,
      shipperEmail,
      shipperPhone,
      shipperAddress,
      carrierName,
      carrierEmail,
      carrierPhone,
      carrierAddress,
      origin,
      destination,
      shipmentType,
      shipmentWeightVolume,
      pickupDateTime,
      deliveryDateTime,
      addDetails,
      bidAmount,
    });
    return res.status(200).json({
      msg: "carrierBidData added successfully",
    });
  } catch (error) {
    console.error("❌ Error adding carrierBidData ❌:", error);
    res.status(500).json({ msg: "Error in fetching carrierBidData data" });
  }
};

const dashboardData = async (req, res) => {
  try {
    let shipmentDashboardData = await Shipment.find().select("-_id -__v");
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
