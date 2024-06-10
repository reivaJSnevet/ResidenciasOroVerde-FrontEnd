import { Link } from 'react-router-dom';
import Logo from './logo';
import {useState, useEffect} from 'react';
import api from '../../../database/api';



const HeaderHome2 = () => {
  const [showRentCards, setShowRentCards] = useState(false);
  const [showSaleCards, setShowSaleCards] = useState(false);
  const [topRatedHouses, setTopRatedHouses] = useState([]);
  const [topSaleHouses, setTopSaleHouses] = useState([]);

  const sortHouses = (casas) => {
    return casas.sort((a, b) => b.rating - a.rating);
  }

  // Función para obtener las casas mejor calificadas desde la API
  const fetchTopRatedHouses = async () => {
    try {
      const response = await api.get('properties'); // Ruta del endpoint
      console.log(response.data);
      const sortedHouses = sortHouses(response.data);
      setTopRatedHouses(sortedHouses.filter(house => house.forRent).slice(0, 3)); // Obtener las tres primeras casas para alquilar
    } catch (error) {
      console.error('Error al obtener las casas mejor calificadas:', error);
    }
  };

  // Función para obtener las casas en venta desde la API
  const fetchTopSaleHouses = async () => {
    try {
      const response = await api.get('properties'); // Ruta del endpoint
      console.log(response.data);
      const sortedHouses = sortHouses(response.data);
      setTopSaleHouses(sortedHouses.filter(house => !house.forRent).slice(0, 3)); // Obtener las tres primeras casas para vender
    } catch (error) {
      console.error('Error al obtener las casas para vender:', error);
    }
  };

  useEffect(() => {
    if (showRentCards) {
      fetchTopRatedHouses();
    }
  }, [showRentCards]);

  useEffect(() => {
    if (showSaleCards) {
      fetchTopSaleHouses();
    }
  }, [showSaleCards]);

  return (
    <header id="header-home2" className="fixed z-40 flex items-center justify-between w-full px-10 text-white ">
      <div className="flex flex-grow basis-0">
        <a href="" className="w-auto">
          <Logo />
        </a>
      </div>

      <nav className="relative hidden xl:block sm:hidden">
        <ul className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
          <li><Link to="/">Inicio</Link></li>
          <li
            onMouseEnter={() => setShowRentCards(true)}
            onMouseLeave={() => setShowRentCards(false)}
            className="relative"
          >
            <a href="#">Alquiler</a>
            {showRentCards && (
              <div className="absolute left-0 w-64 p-4 mt-2 text-black bg-white rounded-lg shadow-lg top-full">
                {topRatedHouses.map((house) => {
                  const photoUrls = house.photos.split(','); // Dividir en una lista si hay múltiples URLs
                  const firstPhotoUrl = photoUrls[0];

                  return (
                    <div key={house.id} className="mb-4 last:mb-0">
                      <img src={firstPhotoUrl} alt={house.name} className="object-cover w-full h-32 rounded-md" />
                      <h3 className="mt-2 text-center">{house.name}</h3>
                    </div>
                  );
                })}
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => setShowSaleCards(true)}
            onMouseLeave={() => setShowSaleCards(false)}
            className="relative"
          >
            <a href="#">Venta</a>
            {showSaleCards && (
              <div className="absolute left-0 w-64 p-4 mt-2 text-black bg-white rounded-lg shadow-lg top-full">
                {topSaleHouses.map((house) => {
                  const photoUrls = house.photos.split(','); // Dividir en una lista si hay múltiples URLs
                  const firstPhotoUrl = photoUrls[0];

                  return (
                    <div key={house.id} className="mb-4 last:mb-0">
                      <img src={firstPhotoUrl} alt={house.name} className="object-cover w-full h-32 rounded-md" />
                      <h3 className="mt-2 text-center">{house.name}</h3>
                    </div>
                  );
                })}
              </div>
            )}
          </li>
          <li><Link to="/mapa">Mapa</Link></li>
        </ul>
      </nav>

      <nav className="flex justify-end flex-grow basis-0">
        <ul className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
          <li><Link to="/login">Iniciar sesión</Link></li>
          <li><Link to="/registro">Registrarse</Link></li>
        </ul>
      </nav>
    </header>
  );
};


export default HeaderHome2;
