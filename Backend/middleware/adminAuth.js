import jwt from "jsonwebtoken";
import dotenv from "dotenv";  
dotenv.config();
export const adminAuth = (req, res, next) => {
  try {
    const {adminToken} = req.cookies;
    if (!adminToken) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const tokenDecode = jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET_KEY);
    if (tokenDecode.id) {
      req.body.adminId = tokenDecode.id;
      next();
    } else {
      return res.json({
        success: false,
        message: "Unauthorized, please log in again",
      });
    }
  } catch (error) {
    console.log("Error in admin auth middleware", error.message);
    return res.json({
      success: false,
      message: `Authentication error: ${error.message}`,
    });
  }
}