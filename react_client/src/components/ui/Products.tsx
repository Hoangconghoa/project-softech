import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import globalConfigs from "../../constants/config";
import numeral from "numeral";
import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import config from "../../constants/config";
type TProps = {
  title: string;
  id: string;
  limit?: number;
};
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
}

interface DataProduct {
  ArrProducts: [
    {
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
    }
  ];
}
const Products = () => {
  const [params] = useSearchParams();

  const page = params.get("page");
  const limit = 10;
  const int_page = page ? parseInt(page) : 1;

  //Hàm fetch products
  const getProducts = async (page = 1, limit = 9) => {
    return axios.get(
      config.urlAPI + `/v1/products?page=${page}&limit=${limit}`
    );
  };

  // Queries
  const queryProducts = useQuery({
    queryKey: ["products", int_page, limit],
    queryFn: () => getProducts(int_page, limit),
  });
  console.log(queryProducts.data);
  //lấy danh sách
  // const queryProducts = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => getProducts(),
  // });

  // const { data: products, isLoading } = useQuery({
  //   queryKey: ["homeproduct"],
  //   queryFn: getProducts,
  // });
  // console.log(products?.data.data);
  return (
    <div className="">
      {/* <ul className="flex gap-x-[20px]">
        {" "}
        {products?.products.length &&
          products?.products.map((product: DataType) => {
            return (
              <li className="max-w-[220px]" key={product._id}>
                <Link to={`/products/${product.slug}`}>
                  <div className="photos">
                    <img
                      className="w-full"
                      src={product.thumbnail}
                      alt={product.productName}
                    />
                  </div>
                  <h3>{product.productName}</h3>
                  <div className="price">
                    <strong>{numeral(product.price).format("0,0$")}</strong>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul> */}
    </div>
  );
};

export default Products;
