import {
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSnackbar } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import { useState, useEffect } from "react";

function UpdateProperty({ property, onUpdate, tittle, onClose }) {
  const api = useAxiosPrivate();
  const [propertyData, setPropertyData] = useState({
    name: "",
    coordinates: {
      type: "Point",
      coordinates: [0, 0],
    },
    forRent: false,
    bedroomNum: "",
    bathroomNum: "",
    garage: "",
    rentalPrice: 0,
    salePrice: "",
    description: "",
    restriction: "",
    photos: "",
    UserId: 0,
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (property) {
      setPropertyData({
        ...property,
        coordinates: {
          ...property.coordinates,
          coordinates: property.coordinates.coordinates || [0, 0],
        },
      });
    }
  }, [property]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "coordinates") {
      setPropertyData((prevState) => ({
        ...prevState,
        coordinates: {
          ...prevState.coordinates,
          coordinates: value
            .split(",")
            .map((coord) => parseFloat(coord.trim())),
        },
      }));
    } else {
      setPropertyData((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const isForRent = value === "Sí";
    setPropertyData((prevState) => ({
      ...prevState,
      forRent: isForRent,
      rentalPrice: isForRent ? prevState.rentalPrice : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/properties/${property.id}`, {
        ...propertyData,
        squareMeters: formData.squareMeters + "m²",
      });
      enqueueSnackbar("Propiedad actualizada", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      onUpdate();
    } catch (error) {
      enqueueSnackbar("Error al actualizar propiedad", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

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
  };

  return (
    <Box sx={style} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {tittle}
          <Button style={{ color: "#3c6c42" }} onClick={onClose}>
            <CancelIcon />
          </Button>
        </div>
      </Typography>

      <Grid container spacing={2} margin={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="name"
            label="Nombre"
            value={propertyData.name || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="coordinates"
            label="Coordenadas"
            value={propertyData.coordinates.coordinates.join(", ") || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="for-rent-label">En renta</InputLabel>
            <Select
              labelId="for-rent-label"
              name="forRent"
              value={propertyData.forRent ? "Sí" : "No"}
              onChange={handleSelectChange}
            >
              <MenuItem value="Sí">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {propertyData.forRent && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              name="rentalPrice"
              label="Precio de renta"
              value={propertyData.rentalPrice || ""}
              onChange={handleInputChange}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            name="bedroomNum"
            label="Número de habitaciones"
            value={propertyData.bedroomNum || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            name="bathroomNum"
            label="Número de baños"
            value={propertyData.bathroomNum || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            name="garage"
            label="Garaje"
            value={propertyData.garage || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            name="salePrice"
            label="Precio de venta"
            value={propertyData.salePrice || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="description"
            label="Descripción"
            value={propertyData.description || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="restriction"
            label="Restricciones"
            value={propertyData.restriction || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="photos"
            label="Fotos"
            value={propertyData.photos || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            name="UserId"
            label="Usuario Admistrador"
            value={propertyData.User?.name || ""}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        style={{ backgroundColor: "#3c6c42", color: "#fff" }}
        type="submit"
        fullWidth
      >
        Guardar
      </Button>
    </Box>
  );
}

export default UpdateProperty;
