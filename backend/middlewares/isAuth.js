import jwt from "jsonwebtoken"

const isAuth = async (req,res,next) => {
  try {
    const token  = req.cookies.token;
    if(!token){
      return res.status(401).json({message:"token not found || not authenticated"});
    }
    const verifyToken =  jwt.verify(token,process.env.JWT_SECRET)

    req.userId =  verifyToken.userId

    next()
  } catch (error) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please sign in again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.error("Auth middleware error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export default isAuth;