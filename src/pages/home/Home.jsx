import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../stylesheets/Home.css'
import { useState, useEffect } from 'react';
import api from '../../database/api';
import CardsHome from './components/CardsHome';
import { Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [propiedades, setPropiedades] = useState([]);
  const [totalAlquiladas, setTotalAlquiladas] = useState(0);
  const [totalVendidas, setTotalVendidas] = useState(0);

  const navigate = useNavigate();

  const handleSwitchChange = () => {
    navigate('/home2');
  };
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

  const redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <>
 
  
      <Header/>
      <div className="relative">
        <Switch className="switchThumb" onChange={handleSwitchChange} />

        <div 
          className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat text-center "
          id='home'
          style={{
            backgroundImage: 'url("/Homepotrero.jpeg")',
            height: '600px'
          }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed "
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          >
            <div className="flex h-full items-center justify-center px-12 font-mono">
              <div className="text-white">
                <h2 className="mb-4 text-8xl font-bold">Residencias</h2>
                <h4 className="mb-6 text-6xl font-serif font-bold">Oro Verde</h4>
              </div>
            </div>
          </div>
        </div>


        <div className='page-container p-8'>
          <MapContainer center={[10.6313, -85.4378]} zoom={9}
            scrollWheelZoom={false} className="mapContainer" style={{ height: '600px' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {propiedades.map(property => (
              <Marker
                key={property.id}
                position={[property.coordinates.coordinates[0], property.coordinates.coordinates[1]]}
                icon={property.forRent ? redIcon : blueIcon}>
                <Popup>
                  <div className="flex flex-col items-center justify-center h-full">
                    <img src={property.photos.split(',')[0]} alt="Property" className="w-full" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                    <div className="relative px-10 py-5">
                      <h3 className="font-semibold text-lg mb-2">{property.name}</h3>
                      <p className="text-gray-500 text-sm">{property.description}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div style={{ marginBottom: '50px' }} ></div>
        <CardsHome totalAlquiladas={totalAlquiladas} totalVendidas={totalVendidas} />
        <div style={{ marginBottom: '50px' }} ></div>
        <div id="contacto">
        </div>
      </div>
        <Footer />
      
    </>
  );
}

export default Home