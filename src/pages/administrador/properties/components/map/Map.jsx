import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Box, useTheme, useMediaQuery } from "@mui/material";

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
  };

  return (
    <>
      <Box sx={style}>
        <MapContainer center={[10.6313, -85.4378]} zoom={9}>
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
      </Box>
    </>
  );
}

export default Map;
