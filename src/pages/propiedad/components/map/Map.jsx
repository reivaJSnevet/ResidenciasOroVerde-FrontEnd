import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import ChangeView from "./ChangeView";

const Map = ({ center, zoom }) => {
  return (
    
<div className="map-container">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="leaflet-container">
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} />
      </MapContainer>
    </div>
  );
};

export default Map;
