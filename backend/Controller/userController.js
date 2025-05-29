const login = require("../Models/Auth/loginMethod");
const signUp = require("../Models/Auth/signUpMethod");
const jwt = require("jsonwebtoken");


const createToken = (_id) =>{
 return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
}
const signupUser = async (req, res) => {
  try {
    const { displayName, username, email, password } = req.body;
    if (!displayName || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await signUp(displayName, username, email, password);
    if (!user) {
      return res.status(400).json({ error: "User registration failed" });
    }
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await login(identifier, password);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = createToken(user._id);
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
