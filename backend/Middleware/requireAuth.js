const jwt = require("jsonwebtoken");
const User = require("../Models/BluePrint/userModel");
const { mongoose } = require("mongoose");
const token_secret = process.env.JWT_SECRET;
const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: `authorization token required` });
    }
    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, token_secret);
       if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(401).json({ error: `authorization token required` });
    }
    req.user = await User.findOne({ _id }).select("_id");
 
    if (!req.user) return;
    next();
  } catch (error) {
    return res.status(401).json({ error: `Request is not authorized` });
  }
};

module.exports = { requireAuth };
