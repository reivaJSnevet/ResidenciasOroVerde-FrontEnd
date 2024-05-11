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

const useFormStore = create((set) => ({
  formData: {
    name: "",
    lastName: "",
    lastName2: "",
    email: "",
    password: "",
    phoneNumbers: "",
    principal: "",
    secundario: "",
    RoleId: 0,
  },
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: () =>
    set(() => ({
      formData: {
        name: "",
        lastName: "",
        lastName2: "",
        email: "",
        password: "",
        phoneNumbers: "",
        principal: "",
        secundario: "",
        RoleId: 0,
      },
    })),
}));

function AddUser({ reset, setReset }) {

  const api = useAxiosPrivate();

  const { formData, setFormData, resetFormData } = useFormStore();
  const { enqueueSnackbar } = useSnackbar();
  const [roles, setRoles] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/roles");
        setRoles(response.data);
      } catch (error) {
        enqueueSnackbar("Error cargando roles", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
    };
    fetchData();
  }, [api, enqueueSnackbar]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { principal, secundario, ...rest } = formData;
    try {
      await api.post("/users", {
        ...rest,
        phoneNumbers: {
          principal,
          secundario,
        },
      });
      resetFormData();
      setReset(!reset);
      enqueueSnackbar("Usuario creado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } catch (err) {
      enqueueSnackbar("Error creando usuario", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Agregar Usuario</Typography>
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
                <Grid xs={12} sm={4}>
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
                <Grid xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    type="text"
                    name="lastName"
                    label="Primer Apellido"
                    variant="outlined"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    type="text"
                    name="lastName2"
                    label="Segundo Apellido"
                    variant="outlined"
                    value={formData.lastName2}
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    name="email"
                    value={formData.email}
                    label="Correo Electrónico"
                    variant="outlined"
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    name="password"
                    value={formData.password}
                    label="Contraseña"
                    variant="outlined"
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    required
                    name="RoleId"
                    label="Seleccione un rol"
                    value={formData.RoleId}
                    onChange={handleInputChange}
                    
                  >
                    <MenuItem value={0}>Selecciona un rol</MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    name="principal"
                    label="Teléfono principal"
                    value={formData.principal}
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="secundario"
                    label="Teléfono secundario"
                    value={formData.secundario}
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
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AddUser;
