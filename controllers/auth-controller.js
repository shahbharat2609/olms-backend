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
    const userCreated = await User.create(post);

    res.status(201).json({
      msg: "User registered successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ---------LOGIN CONTROLLER-----------

const login = async (req, res) => {
  try {
    const post = req.body;
    console.log("POST", post);

    const userExist = await User.findOne({ email: post.email });
    console.log("USER EXIST", userExist);
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isValidUser = await userExist.comparePassword(post.password);

    if (isValidUser) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid e-mail or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { home, register, login };
