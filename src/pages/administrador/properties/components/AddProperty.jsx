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
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";

const useFormStore = create((set) => ({
  formData: {
    name: "",
    coordinates: "",
    type: "Point",
    squareMeters: "",
    forRent: "",
    bedroomNum: "",
    bathroomNum: "",
    garage: "",
    rentalPrice: "",
    salePrice: "",
    description: "",
    restriction: "",
    photos: "",
    UserId: 0,
    CategoryId: 0,
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: () =>
    set(() => ({
      formData: {
        name: "",
        coordinates: "",
        type: "Point",
        squareMeters: "",
        forRent: "",
        bedroomNum: "",
        bathroomNum: "",
        garage: "",
        rentalPrice: "",
        salePrice: "",
        description: "",
        restriction: "",
        photos: "",
        UserId: 0,
        CategoryId: 0,
      },
    })),
}));



function AddProperty({ reset, setReset }) {

  const api = useAxiosPrivate();

  const { formData, setFormData, resetFormData } = useFormStore();
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        
      } catch (error) {
        console.error("Error fetching users", error.message);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error.message);
      }
    };
    fetchCategories();
    fetchData();
  }, [api]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { coordinates, type, ...rest} = formData;
    try {
      await api.post("/properties", {
        ...rest,
        coordinates: {
          coordinates: coordinates.split(",").map((c) => parseFloat(c)),
          type,
        }
      });
      enqueueSnackbar("Propiedad creada", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      resetFormData();
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
                <TextField
                  fullWidth
                  select
                  required
                  name="forRent"
                  label="Tipo de propiedad"
                  value={formData.forRent}
                  onChange={handleInputChange}
                >
                  <MenuItem value={true}>Renta</MenuItem>
                  <MenuItem value={false}>Venta</MenuItem>
                </TextField>
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
                  name="rentalPrice"
                  label="Precio de renta"
                  variant="outlined"
                  value={formData.rentalPrice}
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
              <Grid  xs={12}>
                <TextField
                  fullWidth
                  select
                  required
                  name="UserId"
                  label="Seleccione un usuario"
                  value={formData.UserId}
                  onChange={handleInputChange}
                >
                  <MenuItem value={0}>Seleccione un usuario</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
              </TextField>
              </Grid>
              {/* <Grid  xs={12}>
                <Select
                multiple
                value={formData.CategoryId}
                onChange={handleInputChange}
                input={<TextField />}
                >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
                </Select>
                </Grid> */}
        
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
