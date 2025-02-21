import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Correct the path to your User model

const protect = async (req, res, next) => {
  let token;

  // Check if token is provided in headers
  if (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable

      // Attach user to request object (excluding password)
      req.user = await User.findById(decoded.id).select("-password"); // Use select to exclude

      next(); // Move to the next middleware/controller
    } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" }); // Send 401 response
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" }); // No token provided
  }
};

export default protect; // Export the middleware