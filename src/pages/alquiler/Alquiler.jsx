import { useEffect, useState } from "react";
import api from "../../database/api";
import { Link } from 'react-router-dom';
import Navbar from "../../pages/home/home2/Navbar";
import HeaderHome2 from "../home/home2/HeaderHome2";


    const Alquiler = () => {
      const [topRatedHouses, setTopRatedHouses] = useState([]);
      const [topRents, setTopRents] = useState([]);
      const [topSales, setTopSales] = useState([]);
    
      const sortHouses = (casas) => {
        return casas.sort((a, b) => b.rating - a.rating);
      };
    
      const fetchTopRatedHouses = async () => {
        try {
          const response = await api.get('properties');
          const sortedHouses = sortHouses(response.data);
          setTopRatedHouses(sortedHouses.filter(house => house.forRent).slice(0, 3));
          setTopRents(sortedHouses.filter(house => house.forRent));
          setTopSales(sortedHouses.filter(house => house.forSale));
        } catch (error) {
          console.error('Error al obtener las casas mejor calificadas:', error);
        }
      };
    
      useEffect(() => {
        fetchTopRatedHouses();
      }, []);
    
      return (
        <div>
          <HeaderHome2 topSales={topSales} topRents={topRents} />
    
          <div className="mt-16 text-center">
            <h1 className="my-8 text-3xl font-bold">Casas en Alquiler</h1>
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Las 3 Mejor Calificadas</h2>
              {topRatedHouses.map((house) => (
                <div key={house.id} className="p-4 border rounded-lg shadow-md">
                  <img src={house.photos.split(',')[0]} alt={house.name} className="object-cover w-full h-48 rounded-md" />
                  <h3 className="mt-2 text-xl font-bold">{house.name}</h3>
                  <p>{house.description}</p>
                  <p>Calificación: {house.rating}</p>
                  <Link to={`/details/${house.id}`} className="block mt-2 text-blue-500 hover:underline">
                    Más detalles
                  </Link>
                </div>
              ))}
            </section>
          </div>
        </div>
      );
    };
    
      
      export default Alquiler;

