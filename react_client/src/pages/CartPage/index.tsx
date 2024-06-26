import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../../hooks/useCartStore";
import { GoChevronDown } from "react-icons/go";
import { FaDeleteLeft } from "react-icons/fa6";
import numeral from "numeral";
const CartPage = () => {
  const navigate = useNavigate();
  const { items, increaseQuantity, decreaseQuantity, total, removeItem } =
    useCartStore();
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <div className="h-[220vh] bg-gray-100 ">
      <div className="bg-gray-100 h-screen py-8">
        <div className="ButtonHome flex justify-between">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          >
            BackToShop
          </button>
          <Link to="/order">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
              Đơn hàng đã đặt
            </button>
          </Link>
        </div>
        <div className="container mx-auto px-4">
          <div className="mb-[20px]">
            <h1 className="text-4xl pt-[10px] font-semibold text-center">
              Shopping Cart
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-full">
              <div className="bg-white rounded-lg shadow-md p-6">
                <table className="w-full">
                  <thead className="  bg-[#F2F2F2]">
                    <tr className="h-14 uppercase">
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                      <th className=" font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length > 0 &&
                      items.map((product) => {
                        return (
                          <tr>
                            <td className="py-8">
                              <div className="flex items-center">
                                <img
                                  className="h-16 w-16 mr-4"
                                  src={product.thumb}
                                  alt="Product image"
                                />
                                <span className="font-semibold">
                                  {product.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4">
                              {numeral(product.price).format("0,0$")}
                            </td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <button
                                  onClick={() => {
                                    decreaseQuantity(product.product);
                                  }}
                                  className="border rounded-md py-2 px-4 mr-2"
                                >
                                  -
                                </button>
                                <span className="text-center w-8">
                                  {product.quantity}
                                </span>
                                <button
                                  onClick={() => {
                                    increaseQuantity(product.product);
                                  }}
                                  className="border rounded-md py-2 px-4 ml-2"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-4">
                              {formatCurrency(product.price * product.quantity)}
                            </td>
                            <td className="delete text-center ">
                              <button
                                onClick={() => {
                                  removeItem(product.product);
                                }}
                              >
                                <FaDeleteLeft />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="Discount flex flex-col gap-5">
              <div className="flex gap-32 text-2xl mt-[15px] mb-[15px]">
                <h2>Coupon Discount</h2>
                <GoChevronDown />
              </div>
              <input
                type="text"
                placeholder="Enter coupon here..."
                className="border-solid border-x border-y p-3 w-[330px] border-[#ccc] placeholder:text-[##495057] outline-none"
              />
              <button className="p-3 w-[120px] mt-[10px] text-base text-black border-2 hover:bg-blue-600 hover:text-white">
                Apply
              </button>
            </div>
            <div className="border-solid bg-[#F1F1F1] mt-[10px] border-y border-x border-zinc-300 w-[450px] p-10 mr-[50px]">
              <div className="TotalAndCheck">
                <div className="Subtotal flex justify-between items-center gap-[55px] text-[#666666] font-medium text-lg">
                  <p>Subtotal</p>
                  <p className="text-right"> {formatCurrency(total)}</p>
                </div>
                <hr className="border-solid w-[370px] mt-2" />
                <div className="product leading-10">
                  {items.length >> 0 &&
                    items.map((products) => {
                      return (
                        <div className="pt-4">
                          <p className="text-base">
                            {products.name} x{products.quantity}
                          </p>

                          <hr className="border-solid w-[370px] " />
                        </div>
                      );
                    })}
                </div>
                <div className="flex justify-between mt-5">
                  <p className="font-semibold text-[27px]">Total</p>
                  <p className="font-semibold text-[27px] text-red-500">
                    {formatCurrency(total)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="CheckOut">
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              className="bg-blue-500 text-white float-right mr-[50px] py-2 px-4 rounded-lg mt-4 w-[450px]"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
