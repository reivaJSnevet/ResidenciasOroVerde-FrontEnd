import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    };

    return (
        <nav className="flex items-center justify-between bg-[#3c6c42] p-4 shadow-lg">
            <div className="flex items-center flex-shrink-0 text-white">
                <img className="h-12 w-12" src="/zyro-image-removebg-preview.png" alt="Logo"></img>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-[#c6c9c3] border-[#3c6c42] transition-all duration-500 ease-in-out hover:bg-[#61dd67] hover:text-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">INICIO</Link>
                    <div className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md  transition-all duration-500 ease-in-out mr-4">
                        <button 
                            onClick={handleDropdownToggle} 
                            className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white  rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4"
                        >
                            SERVICIOS
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute z-10 bg-[#3c6c42] mt-2 w-40 rounded-lg shadow-lg">
                                <Link to="/forRent" onClick={handleDropdownClose} className="block py-2 px-4 text-[#c6c9c3] hover:bg-[#61dd67] hover:text-white">ALQUILER</Link>
                                <Link to="/forSale" onClick={handleDropdownClose} className="block py-2 px-4 text-[#c6c9c3] hover:bg-[#61dd67] hover:text-white">VENTA</Link>
                            </div>
                        )}
                    </div>
                    <a href='#contacto' className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">CONTACTO</a>
                    <Link to="/propiedades" className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">BÚSQUEDA</Link>
                    <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">INICIAR SESIÓN</Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;
