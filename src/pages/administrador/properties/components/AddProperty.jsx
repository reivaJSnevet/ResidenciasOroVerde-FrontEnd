import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import Button from "@mui/material/Button";
import { create } from "zustand";
import { useSnackbar } from "notistack";
import Grid from "@mui/system/Unstable_Grid";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Select } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useAuthStore from "../../../../hooks/auth/useAuth";
import HouseIcon from '@mui/icons-material/House';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from "@mui/material/InputLabel";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const useFormStore = create((set) => ({
  formData: {
    name: "",
    coordinates: "",
    type: "Point",
    squareMeters: "",
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
    CategoryId: [],
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: (userId) =>
    set(() => ({
      formData: {
        name: "",
        coordinates: "",
        type: "Point",
        squareMeters: "",
        forRent: false,
        bedroomNum: "",
        bathroomNum: "",
        garage: "",
        rentalPrice: 0,
        salePrice: "",
        description: "",
        restriction: "",
        photos: "",
        UserId: userId,
        CategoryId: [],
      },
    })),
}));



function AddProperty({ reset, setReset }) {

  const api = useAxiosPrivate();

  const { formData, setFormData, resetFormData } = useFormStore();
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([])
  const [showRentalPrice, setShowRentalPrice] = useState(false);

  const idUsuario = useAuthStore((state) => state.auth.user.id);


  useEffect(() => {
    const fectData = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
        console.log(categories)
      } catch (error) {
        enqueueSnackbar("Error cargando categorias", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
    };
    setFormData({ UserId: idUsuario });
    fectData();
  }, [api, idUsuario]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { coordinates, type, forRent, ...rest} = formData;
    try {
      await api.post("/properties", {
        ...rest,
        coordinates: {
          coordinates: coordinates.split(",").map((c) => parseFloat(c)),
          type,
        },
        forRent,
      squareMeters: formData.squareMeters + "m²",
      });
      console.log(formData)
      enqueueSnackbar("Propiedad creada", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      resetFormData(idUsuario);
      setReset(!reset);
    } catch (err) {
      console.log(formData)
      enqueueSnackbar("Error creando propiedad", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  }

  
  const handleCheckboxChange = (event) => {
    setShowRentalPrice(event.target.checked);
    setFormData({ forRent: event.target.checked });
  }

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({ CategoryId: typeof value === "string" ? value.split(",") : value });
  };

  
  const getCategoryNameById = (id) => {
    const category = categories.find((category) => category.id === id);
    return category ? category.name : "";
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Agregar propiedad</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box
              component="form"
              sx={{
                mt: 1,
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
          >
            <FormControl>
            <Grid container spacing={2} margin={1}>
              <Grid  xs={12}>
                <TextField
                  fullWidth
                  required
                  type="text"
                  name="name"
                  label="Nombre"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid  xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  type="text"
                  name="coordinates"
                  label="Coordenadas"
                  variant="outlined"
                  value={formData.coordinates}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid  xs={12} sm={4}>
                <TextField
                fullWidth
                required
                type="text"
                name="squareMeters"
                label="m²"
                variant="outlined"
                value={formData.squareMeters}
                onChange={handleInputChange}
                />
              </Grid>
              <Grid  xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showRentalPrice}
                      onChange={handleCheckboxChange}
                      name="forRent"
                      color="success"
                      icon={<HouseOutlinedIcon />}
                      checkedIcon={<HouseIcon />}
                    />
                  }
                  label="Alquilar también?"
                />
              </Grid>
              <Grid  xs={12} sm={4}>
                <TextField
                 fullWidth
                  required
                  type="number"
                  name="bedroomNum"
                  label="Cuartos"
                  variant="outlined"
                  value={formData.bedroomNum}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid  xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  name="bathroomNum"
                  label="Baños"
                  variant="outlined"
                  value={formData.bathroomNum}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid  xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  name="garage"
                  label="Garage"
                  variant="outlined"
                  value={formData.garage}
                  onChange={handleInputChange}
                />
              </Grid>
             
              <Grid  xs={12} sm={6}>
                <TextField
                  fullWidth
                
                  type="number"
                  name="salePrice"
                  label="Precio de venta"
                  variant="outlined"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                />
              </Grid>
              {showRentalPrice && (
              <Grid  xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="rentalPrice"
                  label="Precio de renta"
                  variant="outlined"
                  value={formData.rentalPrice}
                  onChange={handleInputChange}
                />
              </Grid>
              )}
              <Grid  xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  type="text"
                  name="description"
                  label="Descripción"
                  variant="outlined"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid  xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="restriction"
                  label="Restricciones"
                  variant="outlined"
                  value={formData.restriction}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid  xs={12}>
                <TextField
                  fullWidth
                  required
                  type="text"
                  name="photos"
                  label="Fotos"
                  variant="outlined"
                  value={formData.photos}
                  onChange={handleInputChange}
                />
                </Grid>

                <Grid xs={12}>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Categorías</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={formData.CategoryId}
                    onChange={handleSelectChange}
                    input={<OutlinedInput label="Categorías" />}
                    renderValue={(selected) => selected.map((id) => getCategoryNameById(id)).join(', ')}
                    MenuProps={MenuProps}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        <Checkbox checked={formData.CategoryId.indexOf(category.id) > -1} />
                        <ListItemText primary={category.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
            </FormControl>
          </Box>
        </AccordionDetails>

      </Accordion>
    </>
  );
}

export default AddProperty;
