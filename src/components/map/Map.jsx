import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = () => {
  return (
    <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
    <MapContainer center={{lat: 9.7768986, lng: -84.3849529}} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
    </MapContainer>
    </div>
  )
}

export default Map