const User = require("../BluePrint/userModel");
const bcrypt = require("bcryptjs");
const MaxAttempts = 5;
let MaxTrial = 0;
const lockTimeOut = 30 * 60 * 1000; // 30 minutes lockOut

const login = async (identifier, password) => {
  try {
    if (!identifier || !password) {
      throw new Error("All fields are required");
    }
    const existingUser = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    }).select("+password");
    if (!existingUser) {
      if (MaxTrial >= MaxAttempts) {
        throw new Error("Too many login attempts. redirecting to signup page");
      }
      MaxTrial++;
      throw new Error("Invalid credentials");
    }

    //check if the user is locked out
    if (existingUser.isLocked) {
      throw Error("Account is temporarily locked. Please try again later.");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      if (existingUser.loginAttempts >= MaxAttempts) {
        existingUser.lockUntil = Date.now() + lockTimeOut;
        throw new Error(
          "Account is temporarily locked. Please try again later."
        );
      }
      existingUser.loginAttempts += 1;
      await existingUser.save();
      throw Error("Invalid credentials");
    }

    // Reset login attempts on successful login
    existingUser.loginAttempts = 0;
    existingUser.lockUntil = null;
    MaxTrial = 0;
    await existingUser.save();
    return existingUser;
  } catch (error) {
    throw Error(error?.message);
  }
};

module.exports = login;
