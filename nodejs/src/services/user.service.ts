import Customer from "../models/customers.model";
import { ICustomer } from "../types/models";
import globalConfig from "../constants/config";
import createError from "http-errors";
import jwt from "jsonwebtoken";
const CustomerLogin = async (userbody: { email: string; password: string }) => {
  console.log("2 ==> ", userbody);
  //Tìm xem có tồn tại Customer có email không
  let user = await Customer.findOne({ email: userbody.email });

  if (!user) {
    throw createError(401, "Invalid email or password");
  }

  const invalidPasword: boolean = user.password == userbody.password;
  //const invalidPasword = Customer.password === CustomerBody.password;

  if (!invalidPasword) throw createError(401, "Invalid email or password");

  //Tồn tại thì trả lại thông tin Customer kèm token
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    globalConfig.JWT_SECRET as string,
    {
      expiresIn: "7d", // expires in 7days
    }
  );

  const refreshToken = jwt.sign(
    { _id: user._id, email: user.email },
    globalConfig.JWT_SECRET as string,
    {
      expiresIn: "365d", // expires in 24 hours (24 x 60 x 60)
    }
  );

  return {
    Customer: { id: user._id, email: user.email },
    token,
    refreshToken,
  };
};
const refreshToken = async (customer: ICustomer) => {
  const refreshToken = jwt.sign(
    { _id: customer._id, email: customer.email },
    globalConfig.JWT_SECRET as string,
    {
      expiresIn: "7d", // expires in 24 hours (24 x 60 x 60)
    }
  );
  return refreshToken;
};
const getProfile = async (id: string) => {
  // SELECT * FROM staff WHERE id = id
  console.log(id);

  const customer = await Customer.findOne({
    _id: id,
  }).select("-password -__v");

  return customer;
};
export default {
  CustomerLogin,
  refreshToken,
  getProfile,
};
