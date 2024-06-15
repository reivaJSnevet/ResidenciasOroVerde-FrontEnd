import { useEffect, useState } from "react";
import api from "../../database/api";
import { Link } from "react-router-dom";

const Alquiler = () => {
  const [topRatedHouses, setTopRatedHouses] = useState([]);
  const [topRents, setTopRents] = useState([]);
  const [topSales, setTopSales] = useState([]);

  const sortHouses = (casas) => {
    return casas.sort((a, b) => b.rating - a.rating);
  };

  const fetchTopRatedHouses = async () => {
    try {
      const response = await api.get("properties");
      const sortedHouses = sortHouses(response.data);
      setTopRatedHouses(
        sortedHouses.filter((house) => house.forRent).slice(0, 3)
      );
      setTopRents(sortedHouses.filter((house) => house.forRent));
      setTopSales(sortedHouses.filter((house) => house.forSale));
    } catch (error) {
      console.error("Error al obtener las casas mejor calificadas:", error);
    }
  };

  useEffect(() => {
    fetchTopRatedHouses();
  }, []);

  return (
    <div className="flex justify-center mt-16">
      <section className="space-y-8">
        <h1 className="text-2xl font-semibold text-center">Las 3 casas mejor calificadas</h1>
        <div className="flex flex-col items-center space-y-8">
          {topRatedHouses.map((house, index) => (
            <div
              key={house.id}
              className={`p-4 border rounded-lg shadow-md flex flex-col items-center ${index === topRatedHouses.length - 1 ? 'mb-16' : ''}`}
              style={{ width: '50vw', height: '50vw' }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={house.photos.split(",")[0]}
                  alt={house.name}
                  className="absolute top-0 left-0 object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold">{house.name}</h3>
                <p>{house.description}</p>
                <p>Calificación: {house.rating}</p>
                <Link
                  to={`/propiedad/${house.id}`}
                  className="block mt-2 text-blue-500 hover:underline"
                >
                  Más detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Alquiler;
