import User from "../models/user-model.js";
import bcrypt from "bcryptjs";

// ---------HOME CONTROLLER-----------
const home = async (_req, res) => {
  try {
    res.status(200).send("HOME");
  } catch (error) {
    console.log(error);
  }
};

// ---------REGISTER CONTROLLER-----------
const register = async (req, res) => {
  try {
    const post = req.body;

    console.log("POST", req.body);

    const userExist = await User.findOne({ email: post.email });

    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const saltRound = 10;
    post.password = await bcrypt.hash(post.password, saltRound);
    console.log("Hashed Password: ", post.password);
    const userCreated = await User.create(post);

    res.status(200).send({ data: userCreated });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { home, register };
