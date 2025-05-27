const User = require("../BluePrint/userModel");
const MaxAttempts = 5;
let MaxTrial = 0;
const lockTimeOut = 30 * 60 * 1000; // 30 minutes lockOut

const { log } = console;

const login = async (identifier, password) => {
  try {
    if (!identifier || !password) {
      throw new Error("All fields are required");
    }
    const existingUser = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!existingUser) {
        if (MaxTrial >= MaxAttempts) {
            throw new Error("Too many login attempts. Please try again later.");
        }
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error("Login failed: " + error?.message);
  }
};
