import jwt from "jsonwebtoken";

const userauth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_USER_SECRET_KEY);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, please log in again",
      });
    }
  } catch (error) {
    console.log("JWT Verification Error:");
    return res.status(401).json({
      success: false,
      message: `Authentication error: ${error.message}`,
    });
  }
};

export default userauth;
