import { useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";

function UpdateProperty({ property, onUpdate, tittle, onClose, children}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    enqueueSnackbar("Propiedad actualizada con éxito", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
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
      
      <Box sx={style} component={"form"} onSubmit={handleSubmit}>
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
          <Grid  xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              defaultValue={"Casa en la playa"}
            />
          </Grid>
          <Grid  xs={12}>
            <img src="/ping.png" alt="Descripción de la imagen" />
          </Grid>

          <Grid  xs={12} sm={6}>
            <TextField
              fullWidth
              label="m²"
              variant="outlined"
              defaultValue={"2330"}
            />
          </Grid>
          <Grid  xs={12} sm={6}>
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
              <option value="">¿Se renta?</option>
              <option value="primero">Sí</option>
              <option value="segundo">No</option>
            </TextField>
          </Grid>
          <Grid  xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cuartos"
              variant="outlined"
              defaultValue={4}
            />
          </Grid>
          <Grid  xs={12} sm={6}>
            <TextField
              fullWidth
              label="Baños"
              variant="outlined"
              defaultValue={2}
            />
          </Grid>
          <Grid  xs={12} sm={6}>
            <TextField
              fullWidth
              label="Garage"
              variant="outlined"
              defaultValue={2}
            />
          </Grid>
          <Grid  xs={12} sm={6}>
            <TextField
              fullWidth
              label="Precio de renta"
              variant="outlined"
              defaultValue={100000}
            />
          </Grid>
          <Grid  xs={12} sm={6}>
            <TextField
              fullWidth
              label="Precio de venta"
              variant="outlined"
              defaultValue={1000}
            />
          </Grid>
          <Grid  xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              variant="outlined"
              defaultValue={
                "Casa en la playa con vista al mar, 4 cuartos, 2 baños, 2 garajes, 2330 m² de terreno, precio de renta $100,000, precio de venta $1,000,000"
              }
            />
          </Grid>
          <Grid  xs={12} sm={3}>
            <img src="/Homepotrero.jpeg" alt="Descripción de la imagen" />
          </Grid>
          <Grid  xs={12} sm={3}>
            <img src="/Playa-Potrero.jpg" alt="Descripción de la imagen" />
          </Grid>
          <Grid  xs={12} sm={3}>
            <img src="/Villapinilla.jpg" alt="Descripción de la imagen" />
          </Grid>
          <Grid  xs={12} sm={3}>
            <img src="/Tamarindo.jpg" alt="Descripción de la imagen" />
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
    </>
  );
}

export default UpdateProperty;
