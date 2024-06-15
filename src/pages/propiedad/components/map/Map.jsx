import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import ChangeView from "./ChangeView";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = ({ center, zoom, property}) => {
  const redIcon = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const blueIcon = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} icon={
            property.forRent ? redIcon : blueIcon
        } />
      </MapContainer>
    </div>
  );
};

export default Map;
