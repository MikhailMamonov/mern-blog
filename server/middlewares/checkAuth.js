const jwt = require("jsonwebtoken");

module.exports = function () {
  return function (req, res, next) {
    try {
      console.log("hjbhbj");
      const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
      if (!token) {
        try {
          var decoded = jwt.verify(token, process.env.SECRET_KEY);

          req.user = decoded;
          next();
        } catch (error) {
          return res.status(401).json({ message: "Нет доступа" });
        }
      } else {
        return res.status(401).json({ message: "Нет доступа" });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
