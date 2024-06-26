// import Products from "../../components/ui/Products";
import { useEffect, useState } from "react";
import SwiperGallery from "../../components/Swiper/SwiperGallery";
import Support from "../../components/support/support";

import { GoRocket } from "react-icons/go";
import { IoReload } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { MdOutlinePayment, MdOutlineSupportAgent } from "react-icons/md";
import globalConfigs from "../../constants/config";
import axios from "axios";
import Products from "../../components/ui/Products";
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
  thumbnail: string;
  slug: string;
  isHome?: boolean;
  createAt: string;
}
const HomePage = () => {
  const [dataProducts, setDataProducts] = useState<DataType[]>();

  useEffect(() => {
    try {
      const featchData = async () => {
        const response = await axios.get(
          globalConfigs.urlAPI +
            `/v1/products/client/getall?isHot=true&&limit=50`
        );
        setDataProducts(response.data.data.products);
        // console.log("Data", response.data.data.products);
        console.log(dataProducts);
      };
      featchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <div className="">
        <SwiperGallery />
      </div>
      {/*  Ho Tro*/}
      <div className="flex gap-10 justify-evenly items-center mt-12 mx-24">
        <Support
          icon={<GoRocket />}
          label="Free Delivery"
          title="For all oders over $99"
        />
        <hr className="  h-[45px] border-gray-400 border-solid border-x" />
        <Support
          icon={<IoReload />}
          label="90 Days Return"
          title="If goods have problems"
        />
        <hr className="  h-[45px] border-gray-400 border-solid border-x" />
        <Support
          icon={<MdOutlinePayment />}
          label="Secure Payment"
          title="100% secure payment"
        />
        <hr className="  h-[45px] border-gray-400 border-solid border-x" />
        <Support
          icon={<MdOutlineSupportAgent />}
          label="24/7 Support"
          title="Dedicated support"
        />
      </div>
      <div className="mt-5">
        <h1 className="bg-[#c8191f] rounded-tl-lg rounded-tr-lg text-[20px] ml-12 px-[10px] py-[5px] text-white w-[120px]">
          HOT DEAL
        </h1>
        <hr className="text-[#c8191f]" />
        <Swiper
          navigation={true}
          slidesPerView={4}
          modules={[Navigation]}
          className="mySwiper"
        >
          {dataProducts &&
            dataProducts.map((c) => {
              return (
                <SwiperSlide key={c._id}>
                  <div className="product_details flex justify-center items-center">
                    <Products
                      productName={c.productName}
                      price={c.price}
                      thumbnail={c.thumbnail}
                      slug={c.slug}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePage;
