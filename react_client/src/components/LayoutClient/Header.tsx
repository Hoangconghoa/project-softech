import { CiShoppingCart, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Space } from "antd";

import { FaHome } from "react-icons/fa";

import useAuth from "../../hooks/useCustomers";
import England from "../../../public/images/england.jpg";
import Gernamy from "../../../public/images/duc.png";
import France from "../../../public/images/france.png";
import USD from "../../../public/images/usd.svg";
import EURO from "../../../public/images/euro.png";
import GBP from "../../../public/images/logogdb.webp";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { GoChevronDown } from "react-icons/go";

import globalConfigs from "../../constants/config";

import { useCartStore } from "../../hooks/useCartStore";
import { useEffect, useState } from "react";
import axios from "axios";
interface DataType {
  _id: string;
  categoryName: string;
}
const Header = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCartStore();
  const [dataCategory, setDataCategory] = useState<DataType[]>();
  const menuLanguage = [
    { label: "Germany", path: "/germany", img: Gernamy },
    { label: "France", path: "/france", img: France },
  ];
  const menuExchange = [
    { label: "USD", path: "/USD", img: USD },
    { label: "EURO", path: "/EURO", img: EURO },
    { label: "GBP", path: "/GBP", img: GBP },
  ];

  //Lấy danh sách về
  // {data, isLoading, error, isError}
  useEffect(() => {
    try {
      const featchData = async () => {
        const response = await axios.get(
          globalConfigs.urlAPI + "/v1/categories"
        );
        setDataCategory(response.data.data.categories);
        console.log("Data", response.data.data);
      };
      featchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <header className="bg-[#ffffff]  w-full">
        <div className=" flex justify-between items-center py-3 text-sm px-4 font-medium text-gray-500">
          <div className="mx-24 ">
            <p className="font-sans text-gray-500">SHOPPING CENTER</p>
          </div>
          <div>
            <ul className="flex gap-4 mx-24 font-sans ">
              <li>Store Location </li>
              <p>|</p>
              <li> Track Your Order </li>
              <p>|</p>
              <li>
                {" "}
                <DropdownMenu label="VND" items={menuExchange} />{" "}
              </li>
              <p>|</p>
              <li className="flex justify-center items-center gap-1 ">
                <img
                  src={England}
                  alt=""
                  width={30}
                  height={30}
                  className="float-left"
                />
                <DropdownMenu label="English" items={menuLanguage} />
                <GoChevronDown />
              </li>
            </ul>
          </div>
        </div>
        {/* Logo, menu sổ, search, giỏ hàng and login */}
        <div className="flex  items-center justify-between text-sm p-4">
          <div className=" logo mx-24">
            <a
              href="index.html"
              className="text-gray-500 font-bold text-4xl flex font-sans"
            >
              <p className="text-black">TECH</p>
              <p className="text-blue-700">NOLOGY</p>
            </a>
          </div>

          <div className="search flex justify-between items-center ">
            <input
              className=" w-[450px] h-[45px] px-3 font-sans border-solid border-y border-x border-black rounded-md "
              type="text"
              placeholder="I'm shopping for..."
            />
            <button className="ml-[-20px] p-3 bg-[#0071df] text-white font-bold w-[85px] h-[45px] rounded-r-lg ">
              Search
            </button>
          </div>

          <div>
            <Link to={"/cart"} className="cart mt-3">
              <button className="hover:text-blue-600">
                <CiShoppingCart className="text-5xl " />
                <span className="text-white text-xs px-[5px]  absolute top-[70px]  rounded-full bg-blue-600 ">
                  {itemCount}
                </span>
              </button>
            </Link>
          </div>
          <div className="login flex justify-center items-center mt-2">
            <div className=" font-mono">
              {user ? (
                <Space wrap size={16}>
                  <strong className="font-bold text-xl">{user.phone}</strong>
                  <span className="cursor-pointer text-[14px]" onClick={logout}>
                    Đăng xuất
                  </span>
                </Space>
              ) : (
                <Space wrap size={16}>
                  {/* <CiUser className="text-5xl float-left -ml-80" /> */}
                  <Link className="text-stone-900" to={"/login"}>
                    <CiUser className="text-5xl" />
                  </Link>
                </Space>
              )}
            </div>
          </div>
        </div>
        {/* Thanh menu */}
        <nav className="w-full bg-blue-700 shadow-lg px-6 py-5 pt-7  text-center">
          <ul className="flex justify-evenly text-base text-white font-bold uppercase items-center">
            <li>
              <Link className="flex justify-center items-center gap-2" to={`/`}>
                <FaHome />
                HOME
              </Link>
            </li>
            {dataCategory &&
              dataCategory.map((c) => {
                return (
                  <li
                    className=" hover:bg-gray-200 active:bg-gray-400 "
                    key={c._id}
                  >
                    <Link to={`/category/${c._id}`}>{c.categoryName}</Link>
                  </li>
                );
              })}
          </ul>
        </nav>
        {/* Banner */}
      </header>
    </div>
  );
};

export default Header;
