import axios from "axios";
import Shipment from "../models/shipment-model.js";
import User from "../models/user-model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PVT_KEY);
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
    };
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
const pdfDownload = async (req, res) => {
  try {
    let loadPdfDownload = await Shipment.aggregate([
      {
        $project: {
          shipperId: 1,
          shipperName: 1,
          shipperEmail: 1,
          shipperAddress: 1,
          shipperPhone: 1,
          carrierName: 1,
          carrierEmail: 1,
          carrierAddress: 1,
          carrierPhone: 1,
          origin: 1,
          destination: 1,
          shipmentType: 1,
          shipmentWeightVolume: 1,
          pickupDateTime: {
            $dateToString: { format: "%Y-%m-%d", date: "$pickupDateTime" },
          },
          deliveryDateTime: {
            $dateToString: { format: "%Y-%m-%d", date: "$deliveryDateTime" },
          },
          bidAmount: 1,
        },
      },
    ]);
    console.log("loadpdf", loadPdfDownload);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "Bharat",
        password: "bharat",
      },
      responseType: "arraybuffer",
    };

    axios
      .post("http://192.168.1.6:8080/generate-pdf", loadPdfDownload, config)
      .then((response) => {
        const pdfData = response.data;

        const base64 = pdfData.toString("base64");

        res.set({
          "Content-Type": "application/pdf",
          "Content-Length": base64.length,
        });

        console.log("base", base64);
        return res.status(200).send(base64);
      });
  } catch (error) {
    console.error("❌ Error retrieving pdfDownload data  ❌:", error);
    res.status(500).json({
      msg: "Failed to retrieve pdfDownload data ",
      error: error.message,
    });
  }
};

// const generateInvoice = async (req, res) => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(`{$req.protocol}://{$req.get("host")}` + "/invoice", {
//       waitUntil: "networkidle2",
//     });

//     await page.setViewport({
//       width: 210,
//       height: 297,
//     });

//     const currentDate = new Date();

//     const pdf = await page.pdf({
//       path: `${path.join(
//         __dirname,
//         "../public/files",
//         currentDate.getTime() + ".pdf"
//       )}`,
//       printBackground: true,
//       format: "A4",
//     });

//     await browser.close();

//     const pdfURL = path.join(
//       __dirname,
//       "../public/files",
//       currentDate.getTime() + ".pdf"
//     );

//     // res.set({
//     //   "Content-Type": "application/pdf",
//     //   "Content-Length": pdf.length,
//     // });

//     // res.sendFile(pdfURL);

//     res.download(pdfURL, function (err) {
//       if (err) {
//         res.status(500).json({
//           msg: "Failed to retrieve generateInvoice ",
//           error: err.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("❌ Error generating invoice  ❌:", error);
//     res.status(500).json({
//       msg: "Failed to retrieve generateInvoice ",
//       error: err.message,
//     });
//   }
// };

const paymentId = async (req, res) => {
  try {
    let {
      shipperName,
      shipmentType,
      shipmentWeightVolume,
      pickupDateTime,
      deliveryDateTime,
      bidAmount,
    } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: shipperName,
              description: `Shipment Type: ${shipmentType}\n Pickup: ${new Date(
                pickupDateTime
              ).toLocaleDateString()}\n Delivery: ${new Date(
                deliveryDateTime
              ).toLocaleDateString()}`,
            },

            unit_amount: parseInt(bidAmount / shipmentWeightVolume),
          },
          quantity: shipmentWeightVolume,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(
      "❌ Failed to create sessionId for stripe payment portal  ❌:",
      error
    );
    res.status(500).json({
      msg: "Failed to create sessionId for stripe payment portal ",
      error: err.message,
    });
  }
};

export {
  shipperShipmentData,
  carrierBidData,
  dashboardData,
  pdfDownload,
  paymentId,
};
