import { ObjectId, Date, Model } from "mongoose";
interface BaseProperties {
  sort: number;
  isActive: boolean;
}
export enum EnumOrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Canceled = "canceled",
  PrepareShipping = "prepareShipping",
  Shipping = "shipping",
  CancelShipping = "cancelShipping",
  Shipped = "shipped",
  PendingPaid = "pendingPaid",
  Paid = "paid",
  Refund = "refund",
  Finished = "finished",
}
export type TOrderItems = {
  product: ObjectId;
  quantity: number;
  price: number;
  discount: number;
};
export enum EnumBoolean {
  Yes = "true",
  No = "false",
}
export type TActionOrder = {
  staff: ObjectId;
  action: string;
  orderStatus: string;
  note: string;
};
export enum EnumPayments {
  Cash = "CASH",
  Credit = "CREDIT",
  Cod = "COD",
}
export interface IOrder extends BaseProperties {
  customer?: ObjectId;
  staff?: ObjectId;
  orderDate: Date;
  requiredDate?: Date;
  shippedDate?: Date;
  paidDate?: Date;
  orderStatus: EnumOrderStatus;
  customerName: string;
  customerMobile: string;
  customerEmail?: string;
  shippingAddress: string;
  shippingYard?: string;
  shippingCity?: string;
  shippingDistrict?: string;
  shippingProvince?: string;
  paymentType: EnumPayments;
  orderNote?: string;
  orderItems: TOrderItems[];
  actions?: TActionOrder[];
  createdAt?: Date;
}
// Models and schemas
export type OrderModelType = Model<IOrder>;
///staff
export enum EnumRole {
  Admin = "admin",
  SubAdmin = "subAdmin",
  User = "user",
}
export interface IStaff extends BaseProperties {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role?: EnumRole.Admin | EnumRole.SubAdmin | EnumRole.User;
  isEmailVerified?: boolean;
}

// Put all user instance methods in this interface:
export interface IStaffMethods {
  comparePassword(n: string): boolean;
}

// Create a new Model type that knows about IUserMethods...
export type StaffModel = Model<IStaff, {}, IStaffMethods>;

export interface ICustomer extends BaseProperties {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address: string;
  yard: string;
  district: string;
  province: string;
  password?: string;
}
