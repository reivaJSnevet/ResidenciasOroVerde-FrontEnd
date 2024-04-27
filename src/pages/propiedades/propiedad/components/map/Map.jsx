import { MapContainer, TileLayer, Marker} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = ({center, zoom = 16, scrollWheelZoom = true, markerPosition}) => {
  return (
    <div className='block'>
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom} > 
        <TileLayer
            url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={markerPosition} />
    </MapContainer>
    </div>
  )
}

export default Map