import { verifyToken } from "../utils/token.js";

export const ensureAuthenticated = () => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        error: "Token is not provided",
      });
    }

    let decodedToken;
    try {
      decodedToken = verifyToken(token);
      req.decoded = decodedToken;
      next();
    } catch (err) {
      return res.status(400).json({
        error: "Token is not valid",
      });
    }
  };
};
