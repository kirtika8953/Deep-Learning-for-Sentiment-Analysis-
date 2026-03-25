import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.json({ success: false, message: "Invalid token" });
  }
};
