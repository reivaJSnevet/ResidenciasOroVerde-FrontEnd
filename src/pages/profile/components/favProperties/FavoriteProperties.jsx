import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
const FavoriteProperties = ({ userId }) => {
  const apiPrivate = useAxiosPrivate();
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const favorites = await apiPrivate.get(`/users/${userId}/favorite-properties`);
        setFavs(favorites.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavs();
  }, [userId, apiPrivate]);

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Propiedades Guardadas
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {favs.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  );
};

export default FavoriteProperties;
