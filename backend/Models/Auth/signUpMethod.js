const User = require("../BluePrint/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const saltRounds = process.env.SALT_ROUND;

const { log } = console;

const signUp = async (displayName, username, email, password) => {
  try {
    if (!displayName || !username || !email || !password) {
      throw Error("All fields are required");
    }
    if (!username.startsWith("@")) {
      throw Error("Username must start with '@'");
    }
    if (!validator.isEmail(email)) {
      throw Error("please provide a valid email");
    }
    if (!email.includes("@") || !email.includes(".")) {
      throw Error("Invalid email address");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error(
        "Password must be strong (at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character)"
      );
    }
    if (password.length < 6) {
      throw Error("Password must be at least 6 characters long");
    }

    //Database logic to save user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("Email already exists");
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
    throw new Error("User registration failed: " + error?.message);
  }
};

module.exports = signUp;
