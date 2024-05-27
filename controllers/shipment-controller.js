import axios from "axios";
import Shipment from "../models/shipment-model.js";
import puppeteer from "puppeteer";
import path from "path";

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
// const pdfDownload = async (req, res) => {
//   try {
//     let loadPdfDownload = await Shipment.aggregate([
//       {
//         $project: {
//           shipperId: 1,
//           shipperName: 1,
//           shipperEmail: 1,
//           shipperAddress: 1,
//           shipperPhone: 1,
//           carrierName: 1,
//           carrierEmail: 1,
//           carrierAddress: 1,
//           carrierPhone: 1,
//           origin: 1,
//           destination: 1,
//           shipmentType: 1,
//           shipmentWeightVolume: 1,
//           pickupDateTime: {
//             $dateToString: { format: "%Y-%m-%d", date: "$pickupDateTime" },
//           },
//           deliveryDateTime: {
//             $dateToString: { format: "%Y-%m-%d", date: "$deliveryDateTime" },
//           },
//           bidAmount: 1,
//         },
//       },
//     ]);
//     console.log("loadpdf", loadPdfDownload);
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       auth: {
//         username: "Bharat",
//         password: "bharat",
//       },
//       responseType: "arraybuffer",
//     };

//     axios
//       .post("http://192.168.1.6:8080/generate-pdf", loadPdfDownload, config)
//       .then((response) => {
//         const pdfData = response.data;

//         const base64 = pdfData.toString("base64");

//         res.set({
//           "Content-Type": "application/pdf",
//           "Content-Length": base64.length,
//         });
//         console.log("base", base64);
//         res.send(base64);
//       });
//   } catch (error) {
//     console.error("❌ Error retrieving pdfDownload data  ❌:", error);
//     res.status(500).json({
//       msg: "Failed to retrieve pdfDownload data ",
//       error: error.message,
//     });
//   }
// };

const generateInvoice = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`{$req.protocol}://{$req.get("host")}` + "/invoice", {
      waitUntil: "networkidle2",
    });

    await page.setViewport({
      width: 210,
      height: 297,
    });

    const currentDate = new Date();

    const pdf = await page.pdf({
      path: `${path.join(
        __dirname,
        "../public/files",
        currentDate.getTime() + ".pdf"
      )}`,
      printBackground: true,
      format: "A4",
    });

    await browser.close();

    const pdfURL = path.join(
      __dirname,
      "../public/files",
      currentDate.getTime() + ".pdf"
    );

    // res.set({
    //   "Content-Type": "application/pdf",
    //   "Content-Length": pdf.length,
    // });

    // res.sendFile(pdfURL);

    res.download(pdfURL, function (err) {
      if (err) {
        res.status(500).json({
          msg: "Failed to retrieve generateInvoice ",
          error: err.message,
        });
      }
    });
  } catch (error) {
    console.error("❌ Error generating invoice  ❌:", error);
    res.status(500).json({
      msg: "Failed to retrieve generateInvoice ",
      error: err.message,
    });
  }
};

export {
  shipperShipmentData,
  carrierBidData,
  dashboardData,
  generateInvoice,
  // paymentId,
};
