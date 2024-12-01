import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import globalConfigs from "../../constants/config";
import axios from "axios";
import { message } from "antd";
import { useCartStore } from "../../hooks/useCartStore";
import config from "../../constants/config";

interface DataType {
  _id?: string;
  productName: string;
  price: number;
  description?: string;
  discount: number;
  stock: number;
  thumbnail: string;
  slug: string;
}

const imageUrl = config.urlIMAGE;
const ProductDetail = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [productDetail, setProductDetail] = useState<DataType>({
    _id: "",
    productName: "",
    price: 0,
    description: "",
    discount: 0,
    stock: 0,
    thumbnail: "",
    slug: "",
  });
  const { addItem } = useCartStore();
  const params = useParams();
  const { slug } = params;
  console.log(slug);
  useEffect(() => {
    try {
      const featchData = async () => {
        const response = await axios.get(
          globalConfigs.urlAPI + `/v1/products/slug/${slug}`
        );
        setProductDetail(response.data.data);

        console.log(productDetail);
      };
      featchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <>
      {contextHolder}
      <div className="bg-white p-10">
        <h1 className="text-[30px] font-bold">{productDetail?.productName}</h1>
        <div className="text-green-500 ">
          Tình trạng:
          {productDetail && productDetail?.stock > 0
            ? " còn hàng"
            : " hết hàng"}
        </div>
        {productDetail && productDetail?.stock > 0 ? (
          <span className="text-green-500 ">
            Số lượng: {productDetail?.stock}
          </span>
        ) : (
          <span className="text-red-500">Số lượng: {productDetail?.stock}</span>
        )}
        <hr className="my-10" />
        <div className="flex">
          <div className="img w-[50%]">
            <img
              src={`${imageUrl}${productDetail?.thumbnail}`}
              alt={productDetail?.productName}
              width={400}
              height={500}
            />
          </div>
          <div className="w-[30%]">
            <h1>{productDetail?.description}</h1>
            Giá bán:
            <span className="text-red-500 font-bold text-[25px]">
              {formatCurrency(productDetail?.price)}
            </span>
            <div className="actions my-5">
              <button
                onClick={() => {
                  addItem({
                    product: productDetail?._id ? productDetail._id : " ",
                    name: productDetail.productName,
                    price: productDetail.price,
                    discount: productDetail.discount,
                    quantity: 1,
                    thumb: productDetail.thumbnail,
                  });
                  messageApi.open({
                    type: "success",
                    content: "Sản phẩm đã được thêm vào giỏ hàng",
                  });
                }}
                className="bg-[#c8191f] hover:bg-[#c25b5e] text-white py-3 px-5 rounded"
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
          <div>
            <ul className="bg-[#F0F0F0] px-[10px] ">
              <li className="w-[170px]">Tình trạng:mới 100%</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
