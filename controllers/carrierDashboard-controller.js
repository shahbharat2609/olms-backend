import CarrierDashboard from "../models/carrierDashboard-model.js";

const carrierDashboard = async (req, res) => {
  try {
    let data = await CarrierDashboard.find();
    return res
      .status(200)
      .json({ msg: "Data fetched successfully", carrierDashboard: data });
  } catch (error) {
    res.status(500).json({ msg: "Error in fetching carrierDashboard data" });
  }
};

export default carrierDashboard;
