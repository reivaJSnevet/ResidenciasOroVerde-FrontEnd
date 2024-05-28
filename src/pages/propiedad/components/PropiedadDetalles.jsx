import { Rating } from "@mui/material";
import { Email, Phone, WhatsApp, PinDropOutlined } from "@mui/icons-material";
import Characteristics from "./Characteristics";
import LoginPrompt from "./LoginPrompt";

const PropiedadDetalles = ({ property, auth }) => {
  return (
    <div className="h-full p-6 bg-white rounded-md shadow-lg">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">
        Detalles de la propiedad
      </h2>
      <p className="mb-2 text-lg text-gray-600">{property?.name}</p>
      <p className="mb-4 text-gray-600 text-md">{property?.description}</p>
      <div className="pr-1 mb-1 text-xl font-bold text-gray-700">
        {property.district}, {property.canton}, {property.province}
      </div>

      {property?.forRent && (
        <div className="p-4 mb-6 bg-gray-100 rounded-md shadow-inner">
          <h3 className="mb-3 text-xl font-semibold text-gray-700">
            Calificación
          </h3>

          { auth.accessToken ? (
            <Rating
            name="property-rating"
            precision={0.1}
            value={property?.rating}
            size="large"
            readOnly
          />
          )
            : <LoginPrompt resource="la calificación" />
        }
        </div>
      )}

      <div className="p-4 mb-6 bg-gray-100 rounded-md shadow-inners">
        <h3 className="mb-3 text-xl font-semibold text-gray-700">
          Características
        </h3>
        <Characteristics property={property} />
      </div>

      {auth.accessToken ? (
        <div className="p-4 rounded-md shadow-inner bg-gray-50">
          <h3 className="mb-3 text-xl font-semibold text-gray-700">
            Para más información puedes contactar al agente responsable de la propiedad:
          </h3>
          <div className="mb-2 text-gray-600">
            <b>{property?.User?.name} {property?.User?.lastName}</b>
          </div>
          <div className="flex items-center mb-2 text-gray-600">
            <Email className="mr-2" /> {property?.User?.email}
          </div>
          <div className="flex items-center mb-2 text-gray-600">
            <Phone className="mr-2" /> {property?.User?.phoneNumbers.secundario}
          </div>
          <div className="flex items-center mb-2 text-gray-600">
            <WhatsApp className="mr-2" />{" "}
            {property?.User?.phoneNumbers.principal}
          </div>
          {/* <div className="flex items-center mt-2 text-gray-600">
          <PinDropOutlined className="mr-2" /> Santa Cruz, Guanacaste.
        </div> */}
        </div>
      )
      : <LoginPrompt resource="la información de contacto del agente responsable de la propiedad" />
    }
    </div>
  );
};

export default PropiedadDetalles;
