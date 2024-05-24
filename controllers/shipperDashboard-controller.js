import CarrierDashboard from "../models/carrierDashboard-model.js";
import ShipperDashboard from "../models/shipperDashboard-model.js";
import User from "../models/user-model.js";

const shipperDashboard = async (req, res) => {
  try {
    let data = await ShipperDashboard.findById(req.query._id);
    return res
      .status(200)
      .json({ msg: "Data fetched successfully", shipperDashboard: data });
  } catch (error) {
    res.status(500).json({ msg: "Error in fetching shipperDashboard data" });
  }
};

const postShipper = async (req, res) => {
  try {
    const { _id, ...postData} = req.body;
    console.log(postData);
    const user = await User.findById(_id);
    const postDataWithUserDetails = {
      ...postData,
      shipperName: user.username,
      email: user.email,
      address: user.address,
      phone: user.phone,
      bidAmount: "-"
    };
    console.log(postDataWithUserDetails);
    await CarrierDashboard.create(postDataWithUserDetails);
    return res.status(201).json({
      msg: "Shipment details added successfully",
    });
  } catch (err) {
    console.error("❌ Error adding shipment details ❌:", err.message);
    return res
      .status(500)
      .json({ msg: "Failed to add shipment details", error: err.message });
  }
};

export { shipperDashboard, postShipper };
