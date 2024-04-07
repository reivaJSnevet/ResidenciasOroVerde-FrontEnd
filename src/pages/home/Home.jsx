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
    <div className="home-container" id='home'>

      <Header />
      
      <Switch    className="switchThumb switchTrack" onChange={handleSwitchChange} />
        
      <img src="/Homepotrero.jpeg" alt="Villa" className="background-image" />
      <div className='page-container'>
        <MapContainer center={[10.6313, -85.4378]} zoom={9}
          scrollWheelZoom={false} className="mapContainer">
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
                <div>
                  <h3>{property.name}</h3>
                  <p>{property.description}</p>
                  <img src={property.photos.split(',')[0]} alt="Property" style={{ maxWidth: "200px", maxHeight: "200px" }} />
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
        <Footer />
      </div>
    </div>
  );
}

export default Home