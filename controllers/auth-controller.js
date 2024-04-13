import User from "../models/user-model.js";

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
    res.status(500).json({ error: "Internal server error" });
  }
};

export { home, register };
