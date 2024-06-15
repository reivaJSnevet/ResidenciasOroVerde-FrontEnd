import { Link } from "react-router-dom";
import {
  KingBed,
  Shower,
  DirectionsCar,
  Home,
  LocationOn,
} from "@mui/icons-material";

const PropertyCard = ({ property }) => {
  return (
    <Link
      to={`/propiedad/${property.id}`}
      className="flex flex-col p-4 m-4 transition-transform duration-200 transform bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105"
    >
      <img
        src={property.photos.split(",")[0]}
        alt={property.name}
        className="object-cover w-full h-48 rounded-t-lg"
      />
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <LocationOn className="mr-1" />
          {property.province}, {property.canton}, {property.district}
        </div>
        <p className="mt-2 text-gray-600">{property.description}</p>
        <p className="mt-2 text-lg font-semibold text-gray-800">
          {property.forRent
            ? `Alquiler: $${property.rentalPrice}`
            : `Venta: $${property.salePrice}`}
        </p>
        <div className="flex flex-wrap mt-6 text-sm text-gray-500">
          <div className="flex items-center mb-2 mr-4">
            <Home className="mr-1" /> {property.squareMeters}
          </div>
          <div className="flex items-center mb-2 mr-4">
            <KingBed className="mr-1" /> {property.bedroomNum} Habitaciones
          </div>
          <div className="flex items-center mb-2 mr-4">
            <Shower className="mr-1" /> {property.bathroomNum} Baños
          </div>
          <div className="flex items-center mb-2 mr-4">
            <DirectionsCar className="mr-1" /> {property.garage} Garaje
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
