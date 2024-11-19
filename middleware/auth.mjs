import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
  // Look/pull token from the header
  const token = req.header("x-auth-token");

  // If token is not found
  if (!token) {
    return res.status(401).json({ errors: [{ msg: "No Token, Auth Denied" }] });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
  }
};
