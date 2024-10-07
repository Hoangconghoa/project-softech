import { Link } from "react-router-dom";

interface DataType {
  productName: string;
  discount?: number;
  price: number;
  slug: string;
  thumbnail: string;
}
const Products = ({
  productName,
  price,
  thumbnail,
  slug,
  discount,
}: DataType) => {
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Link
      to={`/products/${slug}`}
      className="cursor-pointer bg-white lg:w-[200px] rounded-[8px] h-[330px] px-[10px] py-[15px] relative shadow-prominent"
    >
      {discount && (
        <div className=" text-[#444] font-[700] line-[22.4px] my-6 ">
          <span className="text-white bg-[#E01020] ml-[-2px] absolute top-0 left-0 rounded-r-[8px]  text-center px-1">
            Giảm {discount}%
          </span>
        </div>
      )}
      <div className="flex items-center justify-center h-[180px]">
        <img
          src={`http://localhost:8080/${thumbnail}`}
          alt={productName}
          width={140}
          height={180}
        />
      </div>
      <p className="font-[600] text-[14px] font-['Roboto']  line-clamp-2">
        {productName}
      </p>
      <div className="text-red-500 font-bold text-[20px] absolute bottom-2">
        {formatCurrency(price)}
      </div>
    </Link>
  );
};

export default Products;
