const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
      console.log(decoded);
      next();
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Нет доступа.",
      });
    }
  } else {
    return res.json({
      message: "Нет доступа.",
    });
  }
};
