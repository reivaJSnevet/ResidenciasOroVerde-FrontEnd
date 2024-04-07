import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Button, Typography, TextField, AccordionDetails } from "@mui/material";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

function UpdateRol({ role, onUpdate }) {
  const api = useAxiosPrivate();
  const [roleData, setRoleData] = useState({
    name: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (role) {
      setRoleData(role);
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/roles/${role.id}`, roleData);
      enqueueSnackbar("Rol actualizado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      onUpdate();
    } catch (error) {
      enqueueSnackbar("Error actualizando rol", {
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
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
    margin: "auto",
    mt: 1,
    maxHeight: "80vh",
    overflowY: "auto",
  };

  return (
    <Box sx={style} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" align="center">
        Editar Rol
      </Typography>
      <AccordionDetails>
        <TextField
          label="Nombre"
          name="name"
          value={roleData.name}
          onChange={handleInputChange}
          fullWidth
        />
      </AccordionDetails>
      <AccordionDetails>
        <Button type="submit" variant="contained" fullWidth>
          Actualizar
        </Button>
      </AccordionDetails>
    </Box>
  );
}

export default UpdateRol;