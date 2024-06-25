import React from "react";
import { Link } from "react-router-dom";
interface DataType {
  productName: string;

  price: number;
  slug: string;
  thumbnail: string;
}
const Products = ({ productName, price, thumbnail, slug }: DataType) => {
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <div className="cursor-pointer bg-white lg:w-[225px] h-[400px] px-[10px] py-[15px]">
      <Link to={`/products/${slug}`}>
        <div className="flex items-center justify-center h-[60%]">
          <img src={thumbnail} alt={productName} width={200} height={250} />
        </div>
        <Link to={`/products/${slug}`} className="font-semibold mt-10 h-[20%]">
          {productName}
        </Link>
        <div className="text-red-500 font-bold text-[25px] h-[20%]">
          {formatCurrency(price)}
        </div>
      </Link>
    </div>
  );
};

export default Products;
