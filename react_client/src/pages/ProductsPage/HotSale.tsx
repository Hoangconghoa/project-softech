import { FaFireAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import globalConfigs from "../../constants/config";
import { DataProduct } from "../../components/data/type";
import Products from "../../components/ui/Products";
const HotSale = () => {
  const [dataProducts, setDataProducts] = useState<DataProduct[]>();
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 10,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          seconds = 59;
          minutes -= 1;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours -= 1;
        } else if (days > 0) {
          seconds = 59;
          minutes = 59;
          hours = 23;
          days -= 1;
        } else {
          // Countdown has finished
          clearInterval(timer);
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const featchData = async () => {
        const response = await axios.get(
          globalConfigs.urlAPI +
            `/v1/products/client/getall?discount_min=10&&discount_max=99`
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
  const span = "rounded-full font-bold bg-white text-black py-[2px] px-[5px]";
  return (
    <div className="md:w-[1176px] h-[413px] bg-gradient-to-r from-[#F9405E] to-[#F83F60] rounded-[8px] m-2 p-2">
      <div className="flex justify-between text-white mb-3 pt-3 px-10">
        <div className="flex gap-2">
          <FaFireAlt />
          <h2 className="uppercase font-bold ">hot sale</h2>
        </div>
        {timeLeft.days !== undefined && (
          <div className="flex gap-1 justify-end font-bold">
            <h2>Kết thúc sau:</h2>
            <p className={span}>
              {timeLeft.days > 9 ? timeLeft.days : "0" + timeLeft.days}
            </p>
            :
            <p className={span}>
              {timeLeft.hours > 9 ? timeLeft.hours : "0" + timeLeft.hours}
            </p>
            :
            <p className={span}>
              {timeLeft.minutes > 9 ? timeLeft.minutes : "0" + timeLeft.minutes}
            </p>
            :
            <p className={span}>
              {timeLeft.seconds > 9 ? timeLeft.seconds : "0" + timeLeft.seconds}
            </p>
          </div>
        )}
      </div>
      <div>
        <Swiper
          navigation={true}
          slidesPerView={4}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
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
                      discount={c.discount}
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

export default HotSale;
