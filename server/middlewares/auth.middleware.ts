import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Нет доступа.",
      });
    }
  } else {
    return res.json({
      message: "Нет доступа.",
    });
  }
}

export default authMiddleware;
