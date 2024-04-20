import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/system/Unstable_Grid";
import { useSnackbar } from "notistack";

function AddProperty({ reset, setReset }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    enqueueSnackbar("Propiedad creada con éxito", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Agregar propiedad</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box>
            <Grid container spacing={2}>
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
                    "Casa en la playa con vista al mar, 4 cuartos, 2 baños, 2 garages, 2330 m² de terreno, precio de renta $100,000, precio de venta $1,000,000"
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
          </Box>
        </AccordionDetails>
        <Button
          variant="contained"
          style={{ backgroundColor: "#3c6c42", color: "#fff" }}
          type="submit"
          fullWidth
        >
          Guardar
        </Button>
      </Accordion>
    </>
  );
}

export default AddProperty;
