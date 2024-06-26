import { useParams } from "react-router-dom";
import globalConfigs from "../../constants/config";
import axios from "axios";
import { useEffect, useState } from "react";
import Products from "../../components/ui/Products";

interface DataType {
  _id?: string;
  productName: string;
  category: { _id: string; categoryName: string };
  brandId: string;
  price: number;
  sort: number;
  isActive: boolean;
  description?: string;
  discount: number;
  stock: number;
  modelYear: number;
  thumbnail: string;
  slug: string;
  isHome?: boolean;
  createAt: string;
}
const ProductPage = () => {
  const [dataProducts, setDataProducts] = useState<DataType[]>();
  const params = useParams();
  const { id } = params;
  console.log(id);
  useEffect(() => {
    try {
      const featchData = async () => {
        const response = await axios.get(
          globalConfigs.urlAPI + `/v1/products?cat_id=${id}`
        );
        setDataProducts(response.data.data.products);
        // console.log("Data", response.data.data.products);
        console.log(dataProducts);
      };
      featchData();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // console.log("dataa", products.data);
  return (
    <>
      <p className="bg-[#c8191f] ml-10 uppercase rounded-tl-lg rounded-tr-lg text-[20px] px-[10px] py-[5px] text-white inline-block">
        {dataProducts && dataProducts[0].category.categoryName}
      </p>
      <hr className="text-[#c8191f]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center items-center">
        {dataProducts &&
          dataProducts.map((c) => {
            return (
              <div className="product_details flex">
                <Products
                  productName={c.productName}
                  price={c.price}
                  thumbnail={c.thumbnail}
                  slug={c.slug}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductPage;
