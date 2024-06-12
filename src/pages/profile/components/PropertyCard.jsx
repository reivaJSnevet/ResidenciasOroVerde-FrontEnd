import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/propiedad/${property.id}`} className="flex flex-col p-4 m-4 transition-shadow duration-200 bg-white rounded-lg shadow-md hover:shadow-lg">
      <img src={property.photos.split(',')[0]} alt={property.name} className="object-cover w-full h-48 rounded-t-lg" />
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <p className="text-sm text-gray-500">{property.province}, {property.canton}, {property.district}</p>
        <p className="mt-2">{property.description}</p>
        <p className="mt-2 font-semibold">{property.forRent ? `Alquiler: $${property.rentalPrice}` : `Venta: $${property.salePrice}`}</p>
        <p className="text-sm text-gray-500">Área: {property.squareMeters}</p>
        <p className="text-sm text-gray-500">Habitaciones: {property.bedroomNum}</p>
        <p className="text-sm text-gray-500">Baños: {property.bathroomNum}</p>
        <p className="text-sm text-gray-500">Garaje: {property.garage}</p>
      </div>
    </Link>
  );
};

export default PropertyCard;
