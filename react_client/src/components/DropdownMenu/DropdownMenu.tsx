import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
    label: string;
    path: string;
    img: string;
}

interface DropdownMenuProps {
    label: string;
    items: MenuItem[];
}

const DropdownMenu = ({ label, items }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
        >
            <button className="dropbtn bg-slate-50">{label}</button>
            {isOpen && (
                <div className="dropdown-content block absolute bg-white w-[120px] z-10 p-2 -mx-11 shadow-sm shadow-gray-400 ">
                    {items.map((item, index) => (
                        <Link className='block flex  gap-1' key={index} to={item.img}>
                            <img width={30} height={30} src={item.img} alt={item.label} className="dropdown-image my-1 " />
                            <p className='float-right py-1 hover:text-yellow-500 '>{item.label}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
