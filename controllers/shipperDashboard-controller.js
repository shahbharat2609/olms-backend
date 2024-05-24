import ShipperDashboard from "../models/shipperDashboard-model.js";

const shipperDashboard = async (req, res) => {
  try {
    let data = await ShipperDashboard.find();
    return res
      .status(200)
      .json({ msg: "Data fetched successfully", shipperDashboard: data });
  } catch (error) {
    res.status(500).json({ msg: "Error in fetching shipperDashboard data" });
  }
};

export default shipperDashboard;
