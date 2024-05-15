import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { sendJsonSuccess } from "../helpers/responseHandler";

const CustomerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await userService.CustomerLogin(req.body);
    sendJsonSuccess(res)(customer);
  } catch (err) {
    next(err);
  }
};
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Nhận được req.customer từ auth.middleware forward qua
     */
    const token = await userService.refreshToken(res.locals.customer);
    sendJsonSuccess(res)(token);
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = res.locals.customer;
    console.log(`res.locals`, res.locals);
    const customer = await userService.getProfile(_id);

    sendJsonSuccess(res)(customer);
  } catch (error) {
    next(error);
  }
};
export default {
  CustomerLogin,
  getProfile,
  refreshToken,
};
