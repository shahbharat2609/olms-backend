import CarrierDashboard from "../models/carrierDashboard-model.js";
import ShipperDashboard from "../models/shipperDashboard-model.js";

const carrierDashboard = async (req, res) => {
  try {
    let data = await CarrierDashboard.find();
    console.log(data);
    return res
      .status(200)
      .json({ msg: "Data fetched successfully", carrierDashboard: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error in fetching carrierDashboard data" });
  }
};

const postCarrier = async (req, res) => {
  try {
    const postData = req.body;
    console.log(postData);
    await ShipperDashboard.create(postData);
    return res.status(201).json({
      msg: "Carrier details added successfully",
    });
  } catch (err) {
    console.error("❌ Error adding carrier details ❌:", err);
    return res
      .status(500)
      .json({ msg: "Failed to add carrier details", error: err.message });
  }
};

export {
  carrierDashboard,
  postCarrier,
};
