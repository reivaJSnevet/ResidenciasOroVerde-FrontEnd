import PropertyCard from './PropertyCard';

const FavoriteProperties = ({ favs = [] }) => {
  return (
    <div>
      <h2 className="mb-4 text-xl">Propiedades Guardadas</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favs.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteProperties;
