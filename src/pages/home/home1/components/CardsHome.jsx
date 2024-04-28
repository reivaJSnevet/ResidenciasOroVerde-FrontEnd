import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AddHomeIcon from '@mui/icons-material/AddHome';

function CardsHome({ totalAlquiladas, totalVendidas }) {
  return (

    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center w-64 h-64 bg-white border border-gray-300 transition duration-300 ease-in-out transform hover:bg-[#507c4498] hover:text-white rounded-2xl mr-20">
        <div className="flex flex-col justify-center items-center p-4">
          <div className="flex justify-center items-center w-20 h-20 rounded-full bg-green-700 mb-5">
            <AddHomeIcon className="text-white" />
          </div>
          <h5 className="text-green-700 text-lg font-bold mb-2">Casas de Alquiler</h5>
          <p className="text-green-700 text-5xl font-bold">{totalAlquiladas}</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-64 h-64 bg-white border border-gray-300 rounded-2xl transition duration-300 ease-in-out transform hover:bg-[#507c4498] hover:text-white ml-4">
        <div className="flex flex-col justify-center items-center p-4">
          <div className="flex justify-center items-center w-20 h-20 rounded-full bg-green-700 mb-5">
            <HomeIcon className="text-white" />
          </div>
          <h5 className="text-green-700 text-lg font-bold mb-2">Casas en Venta</h5>
          <p className="text-green-700 text-5xl font-bold">{totalVendidas}</p>
        </div>
      </div>
    </div>
  );
}

export default CardsHome;
