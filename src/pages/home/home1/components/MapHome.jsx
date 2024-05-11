import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function MapHome({propiedades}) {

    const navigate = useNavigate();
  
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
                <div className="mt-4">
                    <div 
                        className="flex items-center justify-between text-sm text-gray-500 ">
                    { 
                        property.rentalPrice && 
                        <>
                            <span className="mr-2 font-semibold">Precio de renta:</span>
                            <span className="font-semibold">₡{property.rentalPrice}</span>
                        </>
                    }
                    {
                        property.salePrice && 
                        <>
                            <span className="mr-2 font-semibold">Precio de venta:</span>
                            <span className="font-semibold">₡{property.salePrice}</span>
                        </>
                    }
                    </div>
                    <div className="flex items-center justify-center w-full mt-4">
                        <button 
                            className="px-4 py-2 mt-4 font-semibold text-white transition duration-300 ease-in-out bg-green-500 rounded hover:bg-green-600"
                            onClick={() => navigate(`/propiedad/${property.id}`)}
                        >
                            Ver propiedad
                        </button>
                    </div>
                </div>
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
