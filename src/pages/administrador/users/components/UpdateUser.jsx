import { useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";

function UpdateUser({ user, onUpdate, tittle, onClose }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   await api.put(`/roles/${role.id}`, roleData);
    enqueueSnackbar("Rol actualizado con éxito", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
    //   onUpdate();
    // } catch (error) {
    //   enqueueSnackbar("Error actualizando rol", {
    //     variant: "error",
    //     anchorOrigin: {
    //       vertical: "top",
    //       horizontal: "center",
    //     },
    //   });
    // }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "90%" : "75%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
    margin: "auto",
    mt: 1,
    maxHeight: "80vh",
    overflowY: "auto",
  };

  return (
    <>
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

          <Button
            variant="contained"
            style={{ backgroundColor: "#3c6c42", color: "#fff" }}
            type="submit"
            fullWidth
          >
            Guardar
          </Button>
        </Grid>
      </Box>
    </>
  );
}

export default UpdateUser;
