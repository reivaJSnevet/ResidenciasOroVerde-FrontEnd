import { Rating } from "@mui/material";
import { Email, Phone, WhatsApp, PinDropOutlined } from "@mui/icons-material";
import Characteristics from "./Characteristics";

const PropiedadDetalles = ({ property, auth }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="mb-4 text-3xl font-bold text-gray-800">Detalles de la propiedad</h2>
    <p className="mb-2 text-lg text-gray-600">{property?.name}</p>
    <p className="mb-4 text-gray-600 text-md">{property?.description}</p>
    
    <div className="p-4 mb-6 rounded-lg shadow-inner bg-gray-50">
      <h3 className="mb-3 text-xl font-semibold text-gray-700">Calificación</h3>
      {auth.accessToken && property?.forRent && (
        <Rating
          name="property-rating"
          precision={0.1}
          value={property?.rating}
          size="large"
          readOnly
        />
      )}
    </div>

    <div className="p-4 mb-6 rounded-lg shadow-inner bg-gray-50">
      <h3 className="mb-3 text-xl font-semibold text-gray-700">Características</h3>
      <Characteristics property={property} />
    </div>

    {auth.accessToken && (
      <div className="p-4 rounded-lg shadow-inner bg-gray-50">
        <h3 className="mb-3 text-xl font-semibold text-gray-700">
          Para más información puedes comunicarte al:
        </h3>
        <div className="flex items-center mb-2 text-gray-600">
          <Email className="mr-2" /> {property?.User?.email}
        </div>
        <div className="flex items-center mb-2 text-gray-600">
          <Phone className="mr-2" /> {property?.User?.phoneNumbers.secundario}
        </div>
        <div className="flex items-center mb-2 text-gray-600">
          <WhatsApp className="mr-2" /> {property?.User?.phoneNumbers.principal}
        </div>
        {/* <div className="flex items-center mt-2 text-gray-600">
          <PinDropOutlined className="mr-2" /> Santa Cruz, Guanacaste.
        </div> */}
      </div>
    )}
  </div>
  );
};

export default PropiedadDetalles;
