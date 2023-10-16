import jwt, { decode } from "jsonwebtoken";
import AuthModel from "../models/auths/AuthModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const docode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await AuthModel.findById(docode.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json("Not authorized, token failed");
      return;
    }
  }
  if (!token) {
    res.status(404).json("Not authorized, no token");
    return;
  }
};
