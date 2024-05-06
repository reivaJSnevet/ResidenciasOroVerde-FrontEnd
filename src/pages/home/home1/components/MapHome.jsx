import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapHome({propiedades}) {
  
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

    <div className='p-8 page-container'>
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
                <h3 className="mb-2 text-lg font-semibold">{property.name}</h3>
                <p className="text-sm text-gray-500">{property.description}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
  );
}

export default MapHome;
