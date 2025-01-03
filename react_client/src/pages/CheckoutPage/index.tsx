import { useCartStore } from "../../hooks/useCartStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
const schema = yup
  .object({
    firstName: yup.string().max(160).required(),
    lastName: yup.string().max(160).required(),
    email: yup.string().email().optional().required(),
    phone: yup.string().max(10).required(),
    shippingAddress: yup.string().max(255).required(),
    shippingYard: yup.string().max(80).required(),
    shippingDistrict: yup.string().max(80).required(),
    shippingProvince: yup.string().max(80).required(),
    paymentType: yup.string().required().oneOf(["COD"]),
  })
  .required();
const Checkout = () => {
  const { items, total, placeOrder, isLoading, error } = useCartStore();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const payload = {
      customerName: data.lastName,
      customerMobile: data.phone,
      shippingAddress: data.shippingAddress,
      shippingYard: data.shippingYard,
      shippingDistrict: data.shippingDistrict,
      shippingProvince: data.shippingProvince,
      // Sản phẩm của đơn hàng
      orderItems: items,
      //Các trường khác của đơn hàng
      paymentType: data.paymentType, //phương thức thanh toán
      orderNote: "", // ghi chú đơn hàng
    };

    const result = await placeOrder(payload);
    if (result.ok) {
      reset(); //reset form
      //khi đặt hàng thành công thì trừ số lượng của sản phẩm đó đi
      // payload.orderItems.map(async (item) => {
      //   const stock = await fetchStock(item.product);
      //   const ProductUpdate: Iproduct = {
      //     stock: stock - item.quantity,
      //   };
      //   console.log("updatepro", ProductUpdate);
      //   const response = await axiosClient.put(
      //     `/v1/products/${item.product}`,
      //     ProductUpdate
      //   );
      //   console.log("updatepro", response.data);
      // });
      messageApi.open({
        type: "success",
        content: "đơn hàng của bạn đã được đặt",
      });
      navigate("/succes");
    } else {
      messageApi.open({
        type: "error",
        content: "Vui lòng xem lại thông tin",
      });
    }
  };
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <>
      {contextHolder}
      {error && <p className="my-5 text-red-500">{error}</p>}
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className=" logo mx-24">
          <Link
            to="/"
            className="text-gray-500 font-bold text-4xl flex font-sans"
          >
            <p className="text-black">TECH</p>
            <p className="text-blue-700">NOLOGY</p>
          </Link>
        </div>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ksjdsk */}
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {items.length > 0 &&
              items.map((product) => {
                return (
                  <div
                    key={product.product}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={product.thumb}
                      alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">{product.name}</span>
                      <p className="text-lg font-bold">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* dskdskj */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div className="">
              <label className="mt-4 mb-2 block text-sm font-medium">
                FirstName
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your firstName"
                />
                <p>{errors.firstName?.message}</p>
              </div>
              <label className="mt-4 mb-2 block text-sm font-medium">
                Lastname
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your lastName"
                />
                <p>{errors.firstName?.message}</p>
              </div>
              <label className="mt-4 mb-2 block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  {...register("email")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
                <p>{errors.email?.message}</p>
              </div>
              <label className="mt-4 mb-2 block text-sm font-medium">
                Mobile
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your phone"
                />
                <p>{errors.phone?.message}</p>
              </div>
              <label className="mt-4 mb-2 block text-sm font-medium">
                Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="shippingAddress"
                  {...register("shippingAddress")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your shippingAddress"
                />
                <p>{errors.shippingAddress?.message}</p>
              </div>
              <label className="mt-4 mb-2 block text-sm font-medium">
                Yard
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="shippingYard"
                  {...register("shippingYard")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your shippingYard"
                />
                <p>{errors.shippingYard?.message}</p>
              </div>
              <label className="mt-4 mb-2 block text-sm font-medium">
                District
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="shippingDistrict"
                  {...register("shippingDistrict")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your shippingDistrict"
                />
                <p>{errors.shippingDistrict?.message}</p>
              </div>
              <label className="mt-4 mb-2 block text-sm font-medium">
                Province
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="shippingProvince"
                  {...register("shippingProvince")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your shippingProvince"
                />
                <p>{errors.shippingProvince?.message}</p>
              </div>

              <p className="mt-8 text-lg font-medium">Payment Methods</p>
              <div className="mt-5 grid gap-6">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="3"
                    type="radio"
                    {...register("paymentType")}
                    name="paymentType"
                    value={`COD`}
                    checked
                  />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_3"
                  >
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">COD</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Delivery: 2-4 Days
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">{total}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">$8.00</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">{total}</p>
              </div>
            </div>
            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              {isLoading ? "Submitting..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
