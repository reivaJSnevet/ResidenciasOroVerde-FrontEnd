import HomeIcon from '@mui/icons-material/Home';
import AddHomeIcon from '@mui/icons-material/AddHome';

function CardsHome({ totalAlquiladas, totalVendidas }) {
  return (

    <div className="flex items-center justify-center">
      <div className="flex justify-center items-center w-64 h-64 bg-white border border-gray-300 transition duration-300 ease-in-out transform hover:bg-[#507c4498] hover:text-white rounded-2xl mr-20">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="flex items-center justify-center w-20 h-20 mb-5 bg-green-700 rounded-full">
            <AddHomeIcon className="text-white" />
          </div>
          <h5 className="mb-2 text-lg font-bold text-green-700">Casas de Alquiler</h5>
          <p className="text-5xl font-bold text-green-700">{totalAlquiladas}</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-64 h-64 bg-white border border-gray-300 rounded-2xl transition duration-300 ease-in-out transform hover:bg-[#507c4498] hover:text-white ml-4">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="flex items-center justify-center w-20 h-20 mb-5 bg-green-700 rounded-full">
            <HomeIcon className="text-white" />
          </div>
          <h5 className="mb-2 text-lg font-bold text-green-700">Casas en Venta</h5>
          <p className="text-5xl font-bold text-green-700">{totalVendidas}</p>
        </div>
      </div>
    </div>
  );
}

export default CardsHome;
