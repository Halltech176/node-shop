const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
exports.checkToken = async (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    response.status(401).json({
      status: "fail",
      message: "auth failed",
    });
  }
};
