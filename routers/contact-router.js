import express from "express";
import authenticateToken from "../middlewares/jwt-middleware.js";
import contactForm from "../controllers/contact-controller.js";

const router = express.Router();

router.route("/contact").post(authenticateToken, contactForm);

export default router;
