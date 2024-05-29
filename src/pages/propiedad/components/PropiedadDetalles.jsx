import { useState } from "react";
import { Rating } from "@mui/material";
import { Email, Phone, WhatsApp, PinDropOutlined } from "@mui/icons-material";
import Characteristics from "./Characteristics";

const PropiedadDetalles = ({ property }) => {
    const [rating] = useState( property?.rating || 0);
    
  return (
    <div className="h-full p-6 bg-white rounded-md shadow-lg">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">
        {property?.name}
      </h2>
      <p className="mb-4 text-gray-700 text-md">{property?.description}</p>
      <div className="mb-2 text-xl font-bold text-gray-700 ">
         <PinDropOutlined className="mr-2 text-gray-700"/>
         {property.district}, {property.canton}, {property.province}
      </div>

      <div className="p-4 mb-6 bg-white rounded-md shadow-inners">
        <h3 className="mb-3 text-xl font-semibold text-gray-700">
          Características
        </h3>
        <Characteristics property={property} />
      </div>
      <div className="p-4 mb-6">
        <h3 className="mb-3 text-xl font-semibold text-gray-700">
          Calificación
        </h3>
        <Rating
          name="rating"
          precision={0.1}
          value={rating}
          size="large"
          readOnly
        />
      </div>

      <div className="p-4 rounded-md">
        <h3 className="mb-3 text-xl font-semibold text-gray-700">
          Para más información puedes contactar al agente responsable de la
          propiedad:
        </h3>
        <div className="mb-2 text-gray-600">
          <b>
            {property?.User?.name} {property?.User?.lastName}
          </b>
        </div>
        <div className="flex items-center mb-2 text-gray-600">
          <Email className="mr-2" /> {property?.User?.email}
        </div>
        <div className="flex items-center mb-2 text-gray-600">
          <Phone className="mr-2" /> {property?.User?.phoneNumbers.secundario}
        </div>
        <div className="flex items-center mb-2 text-gray-600">
          <WhatsApp className="mr-2" /> {property?.User?.phoneNumbers.principal}
        </div>
      </div>
    </div>
  );
};

export default PropiedadDetalles;
