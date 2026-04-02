import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.auth_jwt) {
      token = req.cookies.auth_jwt;
    }

    else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
