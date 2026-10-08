import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // Correct extraction (No destructuring error)
    let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is not found" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(401).json({ message: "User doesn't have a valid token" });
    }

    req.userId = verifyToken.userId || verifyToken.id;
    next();
  } catch (error) {
    console.error("isAuth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

export default isAuth;