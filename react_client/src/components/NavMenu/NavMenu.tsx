// src/DropdownMenu.tsx
import React from 'react';
import { IoMenuOutline, IoDiamondOutline, IoBookOutline } from "react-icons/io5";
import { CiStar, CiHeart, CiPillsBottle1 } from "react-icons/ci";
import { FaMobileAlt, FaCar } from "react-icons/fa";
import { MdElectricBolt, MdOutlineSportsFootball, MdOutlineDiscount } from "react-icons/md";
import { PiTShirtLight } from "react-icons/pi";
import { RiComputerLine } from "react-icons/ri";
import { HiOutlineWrench } from "react-icons/hi2";
import { BsLamp } from "react-icons/bs";
import './NavMenu.css';

const NavMenu: React.FC = () => {
  return (
    <div className="relative inline-block group">
      <button className="">
        <IoMenuOutline className="text-5xl -ml-60" />
      </button>
      <ul className="navmenu ml-[-235px] border-2 -mt-2 absolute w-[250px] text-black">
        <li className="bg-white hover:bg-blue-700 hover:text-white py-2 px-4 block whitespace-no-wrap flex gap-3"><CiStar className='text-xl'/>Hot Promotions</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white py-2 px-4 block whitespace-no-wrap flex gap-3"><MdElectricBolt className='text-xl'/>Consumer Electronic</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white py-2 px-4 block whitespace-no-wrap flex gap-3"><PiTShirtLight className='text-xl'/>  Clothing & Apparel</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white py-2 px-4 block whitespace-no-wrap flex gap-3"><BsLamp className='text-xl'/> Home, Garden & Kitchen</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"> <CiHeart className='text-xl'/> Health & Beauty</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"><IoDiamondOutline className='text-xl'/> Jewelry & Watches</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"><RiComputerLine className='text-xl'/> Computer & Technology</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"> <CiPillsBottle1 className='text-xl'/> Babies & Moms</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"> <MdOutlineSportsFootball className='text-xl'/> Sport & Outdoor</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"> <FaMobileAlt className='text-xl'/> Phones & Accessories</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"> <IoBookOutline className='text-xl'/> Books & Office</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"> <FaCar className='text-xl'/>  Cars & Motorcycles</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"> <HiOutlineWrench className='text-xl'/>  Home Improvements</li>
        <li className="bg-white hover:bg-blue-700 hover:text-white  py-2 px-4 block whitespace-no-wrap flex gap-3"> <MdOutlineDiscount className='text-xl'/> Vouchers & Services</li>
      </ul>
    </div>
  );
};

export default NavMenu;
