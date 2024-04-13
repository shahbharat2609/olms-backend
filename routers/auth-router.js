import express from "express";
const router = express.Router();
import * as authcontrollers from "../controllers/auth-controller.js";
import signupSchema from "../validators/auth-validator.js";
import validate from "../middlewares/validate-middleware.js";

router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(authcontrollers.login);

export default router;
