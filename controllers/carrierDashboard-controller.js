import CarrierDashboard from "../models/carrierDashboard-model.js";

const carrierDashboard = async (req, res) => {
  try {
    const post = req.body;
    console.log("🚚 Carrier Dashboard Details 🚚", post);
    await CarrierDashboard.create(post);
    return res
      .status(200)
      .json({ msg: "Data fetched successfully", carrierDashboard: post });
  } catch (error) {
    res.status(500).json({ msg: "Error in fetching carrierDashboard data" });
  }
};

export default carrierDashboard;
