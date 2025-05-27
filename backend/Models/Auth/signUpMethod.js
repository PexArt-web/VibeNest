const User = require("../BluePrint/userModel");
const bcrypt = require("bcryptjs");
const saltRounds = process.env.SALT_ROUND;

const { log } = console;

const signUp = async (displayName, username, email, password) => {
  try {
    if (!displayName || !username || !email || !password) {
      throw Error("All fields are required");
      return;
    }
    if (password.length < 6) {
      throw Error("Password must be at least 6 characters long");
      return;
    }
    if (!email.includes("@")) {
      throw Error("Invalid email address");
      return;
    }
    if (!username.startsWith("@")) {
      throw Error("Username must start with '@'");
      return;
    }

    //Database logic to save user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("Email already exists");
      return;
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      displayName: displayName,
      username: username,
      email: email,
      password: hashedPassword,
    });
    return user;
  } catch (error) {
    throw new Error("Sign up failed. Please try again.");
  }
};

module.exports = signUp;
