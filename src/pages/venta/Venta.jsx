import { useEffect, useState } from "react";
import api from "../../database/api";
import { Link } from "react-router-dom";
import { categorizeBySaleRent } from "../home/home2/services/categorizeProperties";
import { sortByPrice } from "../home/home2/services/sortProperties";

const Venta = () => {
    const [topPricedHouses, setTopPricedHouses] = useState([]);
  
    const sortHousesByPrice = (casas) => {
      return casas.sort((a, b) => b.price - a.price);
    };
  
    const fetchTopPricedHouses = async () => {
      try {
        const response = await api.get("/properties");
        const { sale } = categorizeBySaleRent(response.data);
        console.log(sale);
        setTopPricedHouses(sortByPrice(sale).slice(0, 3));
      } catch (error) {
        console.error("Error al obtener las casas con mayor precio:", error);
      }
    };
  
    useEffect(() => {
      fetchTopPricedHouses();
    }, []);
  
    return (
      <div className="flex justify-center mt-16">
        <section className="space-y-8">
          <h1 className="text-2xl font-semibold text-center">Las 3 casas más lujosas</h1>
          <div className="flex flex-col items-center space-y-8">
            {topPricedHouses.map((house, index) => (
              <div
                key={house.id}
                className={`p-4 border rounded-lg shadow-md flex flex-col items-center ${index === topPricedHouses.length - 1 ? 'mb-16' : ''}`}
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
                  <p>Precio: ${house.salePrice}</p>
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
  
  export default Venta;