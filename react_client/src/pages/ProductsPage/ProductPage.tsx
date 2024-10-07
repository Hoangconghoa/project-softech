import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import globalConfigs from "../../constants/config";
import { DataProduct } from "../../components/data/type";
import Products from "../../components/ui/Products";
import { FaChevronDown, FaChevronCircleUp } from "react-icons/fa";
import { Button } from "antd";
import Filter from "../Filter/Filter";

const ProductPage = () => {
  const [dataProducts, setDataProducts] = useState<DataProduct[]>();
  const [clean, setClean] = useState(false);
  const [limit, setLimit] = useState(15);
  const [totalItems, setTotalItems] = useState(0);
  const [sortType, setSortType] = useState("1");
  const [sortBy, setSortBy] = useState("price");
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const apiPrice = `price_min=${priceMin}&price_max=${priceMax}`;
  const apiSort = `sortBy=${sortBy}&sortType=${sortType}`;
  useEffect(() => {
    try {
      const api = priceMax !== null ? apiPrice : apiSort;
      const featchData = async () => {
        const response = await axios.get(
          globalConfigs.urlAPI +
            `/v1/products/client/getall?limit=${limit}&${api}`
        );
        setDataProducts(response.data.data.products);
        setTotalItems(response.data.data.totalItems);
        // console.log("Data", response.data.data.products);
        console.log(dataProducts);
      };
      featchData();
    } catch (error) {
      console.log(error);
    }
  }, [limit, sortType, sortBy, priceMax, priceMin]);
  return (
    <>
      <div className="my-5 ml-5">
        <Filter
          setSortType={setSortType}
          setSortBy={setSortBy}
          setPriceMax={setPriceMax}
          setPriceMin={setPriceMin}
        />
      </div>

      <div className="grid grid-cols-1">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {dataProducts &&
            dataProducts.map((c) => {
              return (
                <div
                  key={c._id}
                  className="product_details flex justify-center items-center"
                >
                  {c.discount > 0 ? (
                    <Products
                      productName={c.productName}
                      price={c.price}
                      thumbnail={c.thumbnail}
                      slug={c.slug}
                      discount={c.discount}
                    />
                  ) : (
                    <Products
                      productName={c.productName}
                      price={c.price}
                      thumbnail={c.thumbnail}
                      slug={c.slug}
                    />
                  )}
                </div>
              );
            })}
        </div>
        <div className="flex justify-center items-center gap-3 my-8">
          {limit < totalItems ? (
            <Button
              onClick={() => {
                setLimit(limit + 20);
                setClean(true);
              }}
              className="flex justify-center items-center gap-3"
            >
              <FaChevronDown /> Xem thêm...
            </Button>
          ) : (
            ""
          )}
          {clean && (
            <Button
              onClick={() => {
                setLimit(limit - 20);
                if (limit - 20 <= 15) {
                  setClean(false);
                }
              }}
              className="flex justify-center items-center gap-3"
            >
              <FaChevronCircleUp /> Thu gọn
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
