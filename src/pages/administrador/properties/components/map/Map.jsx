import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ClickHandler({ setCoordinates, handleCloseModal }) {
  useMapEvents({
    click(e) {
      setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
      handleCloseModal();
    },
  });
  return null;
}

function Map({ coordinates, setCoordinates, handleCloseModal }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "90%" : "75%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 5,
    mt: 1,
    maxHeight: "80vh",
    overflowY: "auto",
    overflowX: "hidden",
    borderRadius: "10px",
    zIndex: 9999, // Asegura que el mapa esté por encima de otros elementos
  };

  const handleClose = () => {
    setCoordinates(null); // Limpiar coordenadas si es necesario
    handleCloseModal();
  };

  return (
    <div style={style}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10000, // Asegura que esté por encima del mapa
        }}
      >
        <CloseIcon />
      </IconButton>
      <MapContainer center={[10.6313, -85.4378]} zoom={9} style={{ height: "400px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler
          setCoordinates={setCoordinates}
          handleCloseModal={handleCloseModal}
        />
        {coordinates && (
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>
              Coordenadas: {coordinates.lat}, {coordinates.lng}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
