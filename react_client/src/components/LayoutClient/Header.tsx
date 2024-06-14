import { CiShoppingCart, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, Space } from "antd";

import { FaMobileAlt, FaHome, FaTabletAlt, FaNewspaper } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import { FaComputer } from "react-icons/fa6";
import { MdHeadsetMic, MdDevices, MdOutlinePayment, MdOutlineSupportAgent } from "react-icons/md";
import { FiMusic } from "react-icons/fi";
import useAuth from "../../hooks/useCustomers";
import England from "../../../public/images/england.jpg";
import Gernamy from "../../../public/images/duc.png";
import France from "../../../public/images/france.png";
import USD from "../../../public/images/usd.svg";
import EURO from "../../../public/images/euro.png";
import GBP from "../../../public/images/logogdb.webp";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { GoChevronDown, GoRocket } from "react-icons/go";
import { IoReload } from "react-icons/io5";

import NavMenu from "../NavMenu/NavMenu";
import SwiperGallery from "../Swiper/SwiperGallery";
import Support from "../support/support";
const Header = () => {
  const { user, logout } = useAuth();
  const menuLanguage = [

    { label: 'Germany', path: '/germany', img: Gernamy },
    { label: 'France', path: '/france', img: France }
  ];
  const menuExchange = [
    { label: 'USD', path: '/USD', img: USD },
    { label: 'EURO', path: '/EURO', img: EURO },
    { label: 'GBP', path: '/GBP', img: GBP },
  ]
  return (
    <div>
      <header className="bg-[#ffffff]  w-full">
        <div className=" flex justify-between items-center py-3 text-sm px-4 font-medium text-gray-500">
          <div className="mx-24 "  >
            <p className="font-sans text-gray-500">SHOPPING CENTER <b className="text-black">Hoàng Công Hóa</b></p>
          </div>
          <div >
            <ul className="flex gap-4 mx-24 font-sans ">
              <li>Store Location  </li>
              <p>|</p>
              <li> Track Your Order  </li>
              <p>|</p>
              <li> <DropdownMenu label="USD" items={menuExchange} /> </li>
              <p>|</p>
              <li className="flex justify-center items-center gap-1 ">
                <img src={England} alt="" width={30} height={30} className="float-left" />
                <DropdownMenu label="English" items={menuLanguage} />
                <GoChevronDown />
              </li>
            </ul>
          </div>
        </div>
        {/* Logo, menu sổ, search, giỏ hàng and login */}
        <div className="flex  items-center justify-between text-sm p-4">
          <div className=" logo mx-24">
            <a href="index.html" className="text-gray-500 font-bold text-4xl flex font-sans">
              <p className="text-black">Mart</p><p className="text-blue-700">Fury</p>
            </a>
          </div>
          {/* Sổ menu */}
          <div className="navMenu z-30">
            <NavMenu />
          </div>

          <div className="flex -ml-56">
            <select name="" id="" className="w-[140px] h-[45px] border-gray-400 border-solid border-x border-y">
              <option value="0" className="">All</option>
              <option value="1">Babies & Mons</option>
              <option value="2">Books & Office</option>
              <option value="3">Cars & Motocyles</option>
              <option value="4">Cloting & Apparel</option>
              <option value="5">Accessories</option>
              <option value="6">Bags</option>
              <option value="7">Kid's Fashion</option>
              <option value="8">Mens</option>
              <option value="9">Shoes</option>
              <option value="10">Sunglasses</option>
              <option value="11">Womens</option>
              <option value="12">Computers & Technologies</option>
              <option value="13">Desktop PC</option>
              <option value="14">Laptop</option>
              <option value="15">Smartphones</option>
              <option value="16">Consumer Electrics</option>
              <option value="17">Air Conditioners</option>
              <option value="18">Accessories</option>
              <option value="19">Type Hanging Cell</option>
              <option value="20">Audios & Theaters</option>
              <option value="21">Headphone</option>
              <option value="22">Home Theater System</option>
              <option value="23">Speakers</option>
              <option value="24">Car Election</option>
              <option value="25">Audio & Video</option>
              <option value="26">Car Security</option>
              <option value="27">Radar Detector</option>
              <option value="28">Vahicle GPS</option>
              <option value="29">Office Electronics</option>
              <option value="30">Printers</option>
              <option value="31">Projectors</option>
              <option value="32">Scanners</option>
              <option value="33">Store & Business</option>
              <option value="34">Refrigerators</option>
              <option value="35">Tv Televisions</option>
              <option value="36">4K Ultra HS TVs</option>
              <option value="37">LED TVs</option>
              <option value="38">OLED TVs</option>
              <option value="39">Washing Machines</option>
              <option value="40">Type Drying Clothes</option>
              <option value="41">Type Vertical</option>
              <option value="42">Garden & Kitchen</option>
              <option value="43">Cookware</option>
              <option value="44">Decoration</option>
              <option value="45">Furniture</option>
              <option value="46">Garden Tools</option>
              <option value="47">Home Improvement</option>
              <option value="48">Powers And Handfools</option>
              <option value="49">Utensil & Gadget</option>
              <option value="50">Health & Beauty</option>
              <option value="51">Equipments</option>
              <option value="52">Hair Care</option>
              <option value="53">Perfumer</option>
              <option value="54">Wine Cabinets</option>
            </select>
            <div className="search flex justify-between items-center ">
              <input
                className=" w-[450px] h-[45px] font-sans  border-gray-400 border-solid border-y placeholder: pl-3 pr-3 "
                type="text"
                placeholder="I'm shopping for..."
              />
              <button className="ml-[-20px] p-3 bg-[#0071df] text-white font-bold w-[85px] h-[45px] rounded-r-lg ">
                Search
              </button>
            </div>
          </div>
          <Link to={"/cart"} className="cart mt-3">
            <button className="hover:text-blue-600">
              <CiShoppingCart className="text-5xl -ml-28" />
            </button>
          </Link>
          <div className="login flex justify-center items-center mt-2">
            <CiUser className="text-5xl float-left -ml-80" />
            <span className="font-bold text-xl font-mono">
              {user ? (
                <Space wrap size={16}>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <strong className="">{user.email}</strong>
                  <span className="cursor-pointer text-4xl text-stone-900" onClick={logout}>
                    SignOut
                  </span>
                </Space>
              ) : (
                <Space wrap size={16}>
                  <Link className="text-stone-900" to={"/login"}>
                    Login
                  </Link>
                </Space>
              )}
            </span>
          </div>
        </div>
        {/* Thanh menu */}
        <nav className="w-full bg-blue-700 shadow-lg px-6 py-5 pt-7  text-center">
          <ul className="flex justify-evenly text-base text-white font-bold uppercase items-center">
            <li className="flex justify-center items-center gap-2">
              <FaHome />
              <a className="" href="#">
                Home
              </a>
            </li>
            <li className="flex justify-center items-center gap-2">
              <FaMobileAlt />
              <a className="" href="#">
                Smartphone
              </a>
            </li>
            <li className="flex justify-center items-center gap-2">
              <FaTabletAlt />
              <a className="" href="#">
                Tablets
              </a>
            </li>
            <li className="flex justify-center items-center gap-2">
              <FaComputer />
              <a className="" href="#">
                Laptop
              </a>
            </li>
            <li className="flex justify-center items-center gap-2">
              <FiMusic />
              <a className="" href="#">
                Sounds
              </a>
            </li>
            <li className="flex justify-center items-center gap-2">
              <MdDevices />
              <a className="" href="#">
                Technology equipment
              </a>
            </li>
            <li className="flex justify-center items-center gap-2">
              <MdHeadsetMic />
              <a className="" href="#">
                ACCESORIES
              </a>
            </li>
            <li className="flex justify-center items-center gap-2">
              <FaNewspaper />
              <a className="" href="#">
                Tech news
              </a>
            </li>
          </ul>
        </nav>
        {/* Banner */}
        <div className="">
          <SwiperGallery />
        </div>
        {/*  Ho Tro*/}
        <div className="flex gap-10 justify-evenly items-center mt-12 mx-24">
          <Support icon={<GoRocket />} label="Free Delivery" title="For all oders over $99" />
          <hr className="  h-[45px] border-gray-400 border-solid border-x" />
          <Support icon={<IoReload />} label="90 Days Return" title="If goods have problems" />
          <hr className="  h-[45px] border-gray-400 border-solid border-x" />
          <Support icon={<MdOutlinePayment />} label="Secure Payment" title="100% secure payment" />
          <hr className="  h-[45px] border-gray-400 border-solid border-x" />
          <Support icon={<MdOutlineSupportAgent />} label="24/7 Support" title="Dedicated support" />
        </div>
      </header>
    </div>
  );
};

export default Header;
