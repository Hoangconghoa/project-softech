import { Schema, model } from "mongoose";
import {
  IOrder,
  EnumPayments,
  EnumOrderStatus,
  TOrderItems,
  TActionOrder,
  OrderModelType,
} from "../types/models";

const OrderDetailsSchema = new Schema<TOrderItems>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 70,
  },
});
const actionSchema = new Schema<TActionOrder>(
  {
    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
    },
    note: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  {
    timestamps: true, //true tự tạo ra createAt và updateAt
  }
);

//Tạo một schema
const orderSchema = new Schema<IOrder, OrderModelType>(
  {
    //Ngày tạo đơn
    orderDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    //Ngày yêu cầu giao hàng
    requiredDate: {
      type: Date,
      required: false,
    },
    //Ngày giao hàng
    shippedDate: {
      type: Date,
      required: false,
    },
    //Ngày thanh toán
    paidDate: {
      type: Date,
      required: false,
    },
    //Trạng thái đơn hàng
    orderStatus: {
      type: String,
      enum: [
        EnumOrderStatus.Pending, //Mới đặt hàng
        EnumOrderStatus.Confirmed, //Đã xác nhận đơn hàng
        EnumOrderStatus.Canceled, //Hủy đơn hàng
        EnumOrderStatus.PrepareShipping, //chuẩn bị giao hàng
        EnumOrderStatus.Shipping, //đang giao hàng
        EnumOrderStatus.CancelShipping, //hủy giao hàng
        EnumOrderStatus.Shipped, //đã giao hàng
        EnumOrderStatus.PendingPaid, //Chờ thanh toán
        EnumOrderStatus.Paid, //đã thanh toán
        EnumOrderStatus.Refund, //hoàn tiền
        EnumOrderStatus.Finished, //hoàn thành
      ],
      default: EnumOrderStatus.Pending,
    },
    orderNote: {
      type: String,
    },
    customerName: {
      type: String,
      require: true,
    },
    customerMobile: {
      type: String,
      require: true,
    },
    customerEmail: {
      type: String,
      require: false,
    },
    shippingAddress: {
      type: String,
      require: true,
    },
    shippingYard: {
      type: String,
    },
    shippingDistrict: {
      type: String,
    },
    shippingProvince: {
      type: String,
    },
    paymentType: {
      type: String,
      required: true,
      enum: [EnumPayments.Cash, EnumPayments.Cod, EnumPayments.Credit],
      default: EnumPayments.Cash,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: false,
    },
    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: false,
    },
    time: {
      type: String,
    },
    /**
     * Danh sách sản phẩm của Order
     */
    orderItems: [OrderDetailsSchema],
    /**Lịch sử xử lý đơn hàng
     */
    actions: [actionSchema],
  },
  //Các options
  {
    timestamps: true, //true tự tạo ra createAt và updateAt
  }
);
orderSchema.pre("save", async function (next) {
  const now = new Date();
  const gio = now.getHours().toString().padStart(2, "0");
  const phut = now.getMinutes().toString().padStart(2, "0");
  const giay = now.getSeconds().toString().padStart(2, "0");
  this.time = `${gio}:${phut}:${giay}`;

  next();
});
const Order = model<IOrder, OrderModelType>("Order", orderSchema);
export default Order;
