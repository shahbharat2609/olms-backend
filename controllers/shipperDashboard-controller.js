import ShipperDashboard from "../models/shipperDashboard-model.js";

const shipperDashboard = async (req, res) => {
  try {
    const post = req.body;
    console.log("📦 Shipper Dashboard Details 📦", post);
    await ShipperDashboard.create(post);
    return res
      .status(200)
      .json({ msg: "Data fetched successfully", shipperDashboard: post });
  } catch (error) {
    res.status(500).json({ msg: "Error in fetching shipperDashboard data" });
  }
};

export default shipperDashboard;
