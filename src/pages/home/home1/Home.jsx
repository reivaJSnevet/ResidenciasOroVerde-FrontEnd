import { useState, useEffect } from 'react';
import CardsHome from './components/CardsHome';
import MapHome from './components/MapHome';
import api from '../../../database/api';
import 'leaflet/dist/leaflet.css';

function Home() {
  const [propiedades, setPropiedades] = useState([]);
  const [totalAlquiladas, setTotalAlquiladas] = useState(0);
  const [totalVendidas, setTotalVendidas] = useState(0);

  useEffect(() => {
    const getPropiedades = async () => {
      try {
        const response = await api.get("/properties");
        setPropiedades(response.data);

        const alquiladas = response.data.filter(property => property.forRent).length;
        const vendidas = response.data.filter(property => !property.forRent).length;
        setTotalAlquiladas(alquiladas);
        setTotalVendidas(vendidas);
      } catch (error) {
        console.error(error);
      }
    };
    getPropiedades();
  }, []);


  // Coordenadas aproximadas de los límites de Guanacaste
  // lat >= 9.682 && lat <= 11.214 && lng >= -86.139 && lng <= -84.641;

 
  return (
    <>
      <div className="relative">
        <div 
          className="relative overflow-hidden text-center bg-no-repeat bg-cover "
          id='home'
          style={{
            backgroundImage: 'url("/Homepotrero.jpeg")',
            height: '600px'
          }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed "
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          >
            <div className="flex items-center justify-center h-full px-12 font-mono">
              <div className="text-white">
                <h2 className="mb-4 font-bold text-8xl">Residencias</h2>
                <h4 className="mb-6 font-serif text-6xl font-bold">Oro Verde</h4>
              </div>
            </div>
          </div>
        </div>

        <MapHome propiedades={propiedades} />

        <div style={{ marginBottom: '50px' }} ></div>
        <CardsHome totalAlquiladas={totalAlquiladas} totalVendidas={totalVendidas} />
        <div style={{ marginBottom: '50px' }} ></div>
        <div id="contacto">
        </div>
      </div>
    </>
  );
}

export default Home