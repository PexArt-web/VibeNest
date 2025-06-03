const jwt = require("jsonwebtoken");
const token_secret = process.env.JWT_SECRET;
const { log } = console;
const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: `authorization token required` });
    }
    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, token_secret);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    log(error, "from authorization");
    return res.status(401).json({ error: `request is not authorized` });
  }
};
