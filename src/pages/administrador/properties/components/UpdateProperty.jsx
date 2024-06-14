import {
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSnackbar } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";
import HouseIcon from "@mui/icons-material/House";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import { useState, useEffect } from "react";

function UpdateProperty({ property, onUpdate, tittle, onClose }) {
  const api = useAxiosPrivate();
  const [propertyData, setPropertyData] = useState({
    name: "",
    forRent: false,
    bedroomNum: "",
    bathroomNum: "",
    squareMeters: "",
    garage: "",
    rentalPrice: 0,
    salePrice: "",
    description: "",
    restriction: "",
    UserId: 0,
    categoryId: 0,
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
      }));
    } else {
      setPropertyData((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPropertyData = {
      ...propertyData,
      squareMeters: propertyData.squareMeters.includes("m²")
        ? propertyData.squareMeters
        : `${propertyData.squareMeters}m²`,
      rentalPrice: propertyData.forRent ? propertyData.rentalPrice : 0,
    };

    try {
      await api.put(`/properties/${property.id}`, updatedPropertyData);
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
    borderRadius: "10px",
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setPropertyData((prevState) => ({
      ...prevState,
      forRent: checked,
      rentalPrice: checked ? prevState.rentalPrice : 0,
    }));
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="name"
            label="Nombre"
            value={propertyData.name || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="text"
            disabled
            name="province"
            label="Provincia"
            value={propertyData.province || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            disabled
            type="text"
            name="canton"
            label="Cantón"
            value={propertyData.canton || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            disabled
            type="text"
            name="district"
            label="Distrito"
            value={propertyData.district || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="text"
            name="squareMeters"
            label="Metros cuadrados"
            value={
              propertyData.squareMeters
                ? propertyData.squareMeters.replace("m²", "")
                : ""
            }
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl
            variant="outlined"
            style={{
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              padding: "6px",
              width: "100%",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyData.forRent}
                  onChange={handleCheckboxChange}
                  name="forRent"
                  color="success"
                  icon={<HouseOutlinedIcon />}
                  checkedIcon={<HouseIcon />}
                />
              }
              label="Poner la propiedad en renta"
              labelPlacement="end"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            name="salePrice"
            label="Precio de venta"
            value={propertyData.salePrice || ""}
            onChange={handleInputChange}
          />
        </Grid>
        {propertyData.forRent && (
          <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            name="bedroomNum"
            label="Número de habitaciones"
            value={propertyData.bedroomNum || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="number"
            name="bathroomNum"
            label="Número de baños"
            value={propertyData.bathroomNum || ""}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
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
            disabled
            name="UserId"
            label="Usuario Administrador"
            value={propertyData.User?.name || ""}
            onChange={handleInputChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            name="categoryId"
            label="Categoría"
            value={propertyData.Categories?.[0]?.name || "Sin categoría asignada"}
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
