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

    console.log("✅✅✅", req.body);

    const userExist = await User.findOne({ email: post.email });
    
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const userCreated = await User.create(post);
    const jwt = await userCreated.generateToken();
    res.cookie("jwt", jwt, { maxAge: 36000 });

    res.status(201).json({
      msg: "User registered successfully",
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
      const roles = userExist.roles;
      const token = await userExist.generateToken();
      const responseData = {
        msg: "Login Successful",
        userId: userExist._id.toString(),
        roles: roles,
      };
      res.cookie("jwt", token, { maxAge: 36000 });
      res.status(200).json(responseData);
    } else {
      res.status(401).json({ msg: "Invalid e-mail or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { home, register, login };
