import {
    Shower,
    Garage,
    KingBed,
    Home,
    Paid,
    AttachMoney,
  } from "@mui/icons-material";
  
  const Characteristics = ({ property }) => {
    const cardContainer = "w-full mb-4 ";
    const commonClassNames =
      "p-4 transition duration-300 bg-white rounded-md shadow-md hover:bg-gray-100";
  
    return (
      <div className="flex flex-wrap">
        <div className={cardContainer}>
          <div className={commonClassNames}>
            <Home className="mr-2 text-gray-700" /> 
            <span className="font-semibold text-gray-800">DIMENSIONES</span>
            <p className="mt-2 ml-10 text-gray-600">{property?.squareMeters}</p>
          </div>
        </div>
        <div className={cardContainer}>
          <div className={commonClassNames}>
            <KingBed className="mr-2 text-gray-700" /> 
            <span className="font-semibold text-gray-800">HABITACIONES</span>
            <p className="mt-2 ml-10 text-gray-600">{property?.bedroomNum}</p>
          </div>
        </div>
        <div className={cardContainer}>
          <div className={commonClassNames}>
            <Shower className="mr-2 text-gray-700" /> 
            <span className="font-semibold text-gray-800">DUCHAS</span>
            <p className="mt-2 ml-10 text-gray-600">{property?.bathroomNum}</p>
          </div>
        </div>
        <div className={cardContainer}>
          <div className={commonClassNames}>
            <Garage className="mr-2 text-gray-700" /> 
            <span className="font-semibold text-gray-800">GARAJE</span>
            <p className="mt-2 ml-10 text-gray-600">{property?.garage ? "Sí" : "No"}</p>
          </div>
        </div>
        {(!property?.forRent || property?.salePrice) && (
          <div className={cardContainer}>
            <div className={commonClassNames}>
              <Paid className="mr-2 text-gray-700" /> 
              <span className="font-semibold text-gray-800">PRECIO VENTA</span>
              <p className="mt-2 ml-6 text-gray-600">{property?.salePrice} dólares</p>
            </div>
          </div>
        )}
        {property?.forRent && property?.rentalPrice && (
          <div className={cardContainer}>
            <div className={commonClassNames}>
              <AttachMoney className="mr-2 text-gray-700" />
              <span className="font-semibold text-gray-800">PRECIO ALQUILER</span>
              <p className="mt-2 ml-6 text-gray-600">{property?.rentalPrice} dólares</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Characteristics;
  