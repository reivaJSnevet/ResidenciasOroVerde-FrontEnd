import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ topRents, topSales, showRentCards, setShowRentCards, showSaleCards, setShowSaleCards}) => {


  const handleMouseEnter = (type) => {
    if (type === "rent") {
      setShowRentCards(true);
    } else if (type === "sale") {
      setShowSaleCards(true);
    }
  };

  const handleMouseLeave = () => {
    setShowRentCards(false);
    setShowSaleCards(false);
  };

  return (
    <>
      <nav className={`relative xl:block z-50`}>
        <ul className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("rent")}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <Link to="/alquiler">Alquiler</Link>
            {showRentCards && (
              <div className="fixed inset-0 flex justify-center items-start w-full h-[65vh] mt-16 p-4 bg-white bg-opacity-95 shadow-lg transform transition-transform duration-500 ease-in-out translate-y-0 z-40">
                <div className="flex w-full space-x-4 overflow-auto">
                  {topRents.map((house) => {
                    const photoUrls = house.photos.split(",");
                    const firstPhotoUrl = photoUrls[0];

                    return (
                      <div key={house.id} className="flex-1">
                        <img
                          src={firstPhotoUrl}
                          alt={house.name}
                          className="object-cover w-full h-48 rounded-md"
                        />
                        <h3 className="mt-2 text-center">{house.name}</h3>
                        <Link
                          to={`/propiedad/${house.id}`}
                          className="block mt-2 text-center text-blue-500 hover:underline"
                        >
                          Más detalles
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 bg-white shadow-lg bg-opacity-95">
                    <p className="text-sm text-gray-500">Nuestras casas mejor calificadas</p>  
                </div>
                
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("sale")}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <Link to="/venta">Venta</Link>
            {showSaleCards && (
              <div className="fixed inset-0 flex justify-center items-start w-full h-[65vh] mt-16 p-4 bg-white bg-opacity-95 shadow-lg transform transition-transform duration-500 ease-in-out translate-y-0 z-40">
                <div className="flex w-full space-x-4 overflow-auto">
                  {topSales.map((house) => {
                    const photoUrls = house.photos.split(",");
                    const firstPhotoUrl = photoUrls[0];

                    return (
                      <div key={house.id} className="flex-1">
                        <img
                          src={firstPhotoUrl}
                          alt={house.name}
                          className="object-cover w-full h-48 rounded-md"
                        />
                        <h3 className="mt-2 text-center">{house.name}</h3>
                        <Link
                          to={`/propiedad/${house.id}`}
                          className="block mt-2 text-center text-blue-500 hover:underline"
                        >
                          Más detalles
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 bg-white shadow-lg bg-opacity-95">
                    <p className="text-sm text-gray-500">Nuestras casas más lujosas</p>
                </div>
              </div>
            )}
          </li>
          <li>
            <Link to="/mapa">Mapa</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
