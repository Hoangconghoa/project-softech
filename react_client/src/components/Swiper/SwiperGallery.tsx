import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import { Navigation, Pagination,Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperGallery = () => {
    return (
        <>
            <Swiper className="cursor-pointer"
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                slidesPerView={1} //so luong hinh tren 1 view
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <img className="w-[1520px] h-[280px]"
                        src="https://martfury.nouhtml5.com/static/img/slider/home-10/2.jpg"
                        alt=""
                    />
                    <div className=" absolute top-[80px] left-[250px] text-[#000000] z-10">
                        <p className="text-blue-400 -mt-16 text-lg my-2">Limited Edition</p>
                        <p className="text-4xl font-normal my-1">ILUV AUD MINI</p>
                        <p className="text-4xl font-normal my-2">ULTRA SLIM POCKET-SIZED</p>
                        <p className="text-4xl">SPEAKER JUST <span className="text-4xl text-green-700 font-bold">$59</span></p>
                        <button className="my-10 text-white font-bold bg-sky-500 hover:bg-sky-700 p-[10px] w-[130px] rounded-sm">Shop now</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-[1520px] h-[280px]"
                        src="https://martfury.nouhtml5.com/static/img/slider/home-10/1.jpg"
                        alt=""
                    />
                     <div className=" absolute top-[80px] left-[250px] text-[#000000] z-10">
                        <p className="text-blue-400 -mt-16 text-lg my-2">Special Offer</p>
                        <p className="text-4xl font-normal my-1">MINI HELICOPTER</p>
                        <p className="text-4xl font-normal my-2">DRONE 4 CHANNELS</p>
                        <p className="text-4xl">SALE <span className="text-4xl text-red-600 font-bold">40% Off</span></p>
                        <button className="my-10 text-white font-bold bg-sky-500 hover:bg-sky-700 p-[10px] w-[130px] rounded-sm">Shop now</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-[1520px] h-[280px]"
                        src="https://philong.com.vn/media/banner/21_Jan9606355b3a9fb51f8eeacbdfbdb40003.png"
                        alt=""
                    />
                    <div className=" absolute top-[80px] left-[250px] text-[#ffffff] z-10">
                        <p className="text-blue-400 -mt-16 text-lg my-2">Viewsonic</p>
                        <p className="text-4xl font-normal my-1">Màn Hình Viewsonic</p>
                        <p className="text-4xl font-normal my-2">27inch VA2736-H</p>
                        <p className="text-4xl">SALE <span className="text-4xl text-amber-600 font-bold">5% Off</span></p>
                        <button className="my-10 text-white font-bold bg-sky-500 hover:bg-sky-700 p-[10px] w-[130px] rounded-sm">Shop now</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-[1520px] h-[280px]"
                        src="https://philong.com.vn/media/banner/13_Maycbe9e8614a9ef0937575d3f232d51a08.jpg"
                        alt=""
                    />
                    <div className=" absolute top-[80px] left-[250px] text-[#000000] z-10">
                        <p className="text-blue-400 -mt-16 text-lg my-2">Asus</p>
                        <p className="text-4xl font-normal my-1">Laptop Asus ROG Strix</p>
                        <p className="text-4xl font-normal my-2">G614JU-N3135W</p>
                        <p className="text-4xl">SALE <span className="text-4xl text-amber-600 font-bold">10% Off</span></p>
                        <button className="my-10 text-white font-bold bg-sky-500 hover:bg-sky-700 p-[10px] w-[130px] rounded-sm">Shop now</button>
                    </div>
                </SwiperSlide>
            


            </Swiper>
        </>
    );
};

export default SwiperGallery;