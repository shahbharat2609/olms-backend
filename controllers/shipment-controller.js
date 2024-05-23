import Shipment from "../models/shipment-model.js";

const shipmentDetails = async (req, res) => {
  try {
    const postData = req.body;
    const newShipment = await Shipment.create(postData);
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

export default shipmentDetails;
