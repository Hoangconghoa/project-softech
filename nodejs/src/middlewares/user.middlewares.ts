import jwt, { JwtPayload } from "jsonwebtoken";
import Customer from "../models/customers.model";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import globalConfig from "../constants/config";

interface decodedJWT extends JwtPayload {
  _id?: string;
}
//Xác thực tài khoản
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //If token is not valid, respond with 401 (unauthorized)
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(
      token,
      globalConfig.JWT_SECRET as string
    ) as decodedJWT;
    //try verify Customer exits in database
    const customer = await Customer.findById(decoded._id);

    console.log("Customer authenticateToken", customer);

    if (!customer) {
      return next(createError(401, "Unauthorized"));
    }
    //Đăng ký biến Customer global trong app
    res.locals.customer = customer;

    next();
  } catch (err) {
    return next(createError(403, "Forbidden-authenticateToken"));
  }
};
