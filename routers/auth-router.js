import express from "express"
const router = express.Router();
import * as authcontrollers from "../controllers/auth-controller.js";

router.route("/").get(authcontrollers.home);
router.route("/register").post(authcontrollers.register);

export default router;