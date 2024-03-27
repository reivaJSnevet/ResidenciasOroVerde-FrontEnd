import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../stylesheets/Home.css'
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/auth/useAxiosPrivate';

function Home() {
  const api = useAxiosPrivate();
  const [properties, setProperties] = useState([]);
 

  useEffect(() => {
  
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/propiedades'); 
      if (response.status === 200) {
        setProperties(response.data); 
      } else {
        console.error('Error al obtener propiedades del backend');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };


  return (
    <div className="home-container">

      <Header />
      <img src="/Homepotrero.jpeg" alt="Villa" className="background-image" />
     
      <MapContainer center={[10.6313, -85.4378]} zoom={9} 
      scrollWheelZoom={false} className= "mapContainer">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map(property => (
          <Marker key={property.id} position={[property.coordenadas.coordinates[1], property.coordenadas.coordinates[0]]}>
            <Popup>
              <div>
                <h3>{property.nombre}</h3>
                <p>{property.descripcion}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>


      <Footer />
    </div>
  );
}

export default Home