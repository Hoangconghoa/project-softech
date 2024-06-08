import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { useCartStore } from "../../hooks/useCartStore";
import { axiosClient } from "../../librarys/axiosClient";
interface DataType {
  _id?: string;
  productName: string;
  category: string;
  brandId: string;
  price: number;
  sort: number;
  isActive: boolean;
  description?: string;
  discount: number;
  stock: number;
  modelYear: number;
  thumbnail?: string;
  slug: string;
  isHome?: boolean;
  createAt: string;
}
const ProductPage = () => {
  const { addItem } = useCartStore();

  const [param] = useSearchParams();
  const page = param.get("page");
  const limit = param.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 10;
  const getProducts = async (page = 1, limit = 10) => {
    return axiosClient.get(`/v1/products?page=${page}&limit=${limit}`);
  };
  //lấy danh sách
  const queryProducts = useQuery({
    queryKey: ["products", int_page, int_limit],
    queryFn: () => getProducts(int_page, int_limit),
  });
  console.log("Logdata", queryProducts.data?.data.data.products[0]);
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const data = [1, 2, 3, 4];
  return (
    <div>
      {data.map((index) => {
        return (
          <>
            <div className="product_details flex">
              <div className="gallery">
                <img
                  src={queryProducts.data?.data.data.products[index].thumbnail}
                  alt={
                    queryProducts.data?.data.data.products[index].productName
                  }
                  width={100}
                  height={100}
                />
              </div>
              <div className="product_info">
                <h1 className="text-2xl">
                  {queryProducts.data?.data.data.products[index].productName}
                </h1>
                <div className="price">
                  <strong>
                    {formatCurrency(
                      queryProducts.data?.data.data.products[index].price
                    )}
                  </strong>
                </div>
                <div className="">
                  {queryProducts.data?.data.data.products[index].description}
                </div>
                <div className="actions my-5">
                  <button
                    onClick={() => {
                      addItem({
                        product:
                          queryProducts.data?.data.data.products[index]._id,
                        name: queryProducts.data?.data.data.products[index]
                          .productName,
                        price:
                          queryProducts.data?.data.data.products[index].price,
                        discount:
                          queryProducts.data?.data.data.products[index]
                            .discount,
                        quantity: 1,
                        thumb:
                          queryProducts.data?.data.data.products[index]
                            .thumbnail,
                      });
                    }}
                    className="bg-indigo-700 hover:bg-indigo-900 text-white py-3 px-5 rounded"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ProductPage;
