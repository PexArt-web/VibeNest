const jwt = require("jsonwebtoken");
const User = require("../Models/BluePrint/userModel");
const token_secret = process.env.JWT_SECRET;
const { log } = console;
const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: `authorization token required` });
    }
    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, token_secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({error: `Invalid token`});
      }
    });
    req.user = await User.findOne({ _id }).select("_id");
    if (!req.user) return;
    next();
  } catch (error) {
    return res.status(401).json({ error: `Request is not authorized` });
  }
};

module.exports = { requireAuth };
