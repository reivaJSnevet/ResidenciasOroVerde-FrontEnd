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

// const useFormStore = create((set) => ({
//   formData: {
//     id: "",
//     name: "",
//     lastName: "",
//     lastName2: "",
//     email: "",
//     password: "",
//     phoneNumbers: "",
//     principal: "",
//     secundario: "",
//     RoleId: "",
//   },
//   setFormData: (newFormData) =>
//     set((state) => ({ formData: { ...state.formData, ...newFormData } })),
//   resetFormData: () =>
//     set(() => ({
//       formData: {
//         id: "",
//         name: "",
//         lastName: "",
//         lastName2: "",
//         email: "",
//         password: "",
//         phoneNumbers: "",
//         principal: "",
//         secundario: "",
//         RoleId: "",
//       },
//     })),
// }));

function AddUser({ reset, setReset }) {
  //   const api = useAxiosPrivate();

  //   const { formData, setFormData, resetFormData } = useFormStore();
    const { enqueueSnackbar } = useSnackbar();

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setFormData({ [name]: value });
  //   };

    const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       await api.post("/users", formData);
        enqueueSnackbar("Usuario creado con éxito", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
  //       resetFormData();
  //       setReset(!reset);
  //     } catch (error) {
  //       enqueueSnackbar("Error creando usuario", {
  //         variant: "error",
  //         anchorOrigin: {
  //           vertical: "top",
  //           horizontal: "center",
  //         },
  //       });
  //     }
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
            <Grid container spacing={2} margin={1}>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  name="name"
                  label="Nombre"
                  // value={formData.name}
                  //onChange={handleInputChange}
                  defaultValue={"Juan Diaz"}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  name="lastName"
                  label="Primer Apellido"
                  // value={formData.lastName}
                  //onChange={handleInputChange}
                  defaultValue={"Perez"}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="lastName2"
                  name="lastName2"
                  label="Segundo Apellido"
                  // value={formData.lastName2}
                  //onChange={handleInputChange}
                  defaultValue={"Gomez"}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  name="email"
                  label="Correo Electrónico"
                  // value={formData.email}
                  //onChange={handleInputChange}
                  defaultValue={"example@gmail.com"}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  required
                  id="password"
                  name="password"
                  label="Contraseña"
                  // value={formData.password}
                  //onChange={handleInputChange}
                  defaultValue={"123456"}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  id="phoneNumbers"
                  name="phoneNumbers"
                  label="Teléfono principal"
                  // value={formData.phoneNumbers.principal}
                  //onChange={handleInputChange}
                  defaultValue={"1234567890"}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phoneNumbers"
                  name="phoneNumbers"
                  label="Teléfono secundario"
                  // value={formData.phoneNumbers.secundario}
                  //onChange={handleInputChange}
                  defaultValue={"0987654321"}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  select
                  required
                  id=""
                  name=""
                  label=""
                  SelectProps={{ native: true }}
                  // value={formData.RoleId}
                  //onChange={handleInputChange}
                >
                  <option value="">Seleccione un Rol</option>
                  <option value="primero">Administrador</option>
                  <option value="segundo">Usuario</option>
                </TextField>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth>
              Agregar
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AddUser;
