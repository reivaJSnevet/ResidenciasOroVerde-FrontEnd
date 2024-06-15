import { Autocomplete, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";


function UpdateUser({ user, onUpdate, tittle, onClose }) {
  const [properties, setProperties] = useState([]);
  const api = useAxiosPrivate();
  const [roleData, setRoleData] = useState({
    id: "",
    name: "",
    lastName: "",
    lastName2: "",
    email: "",
    password: "",
    phoneNumbers: {
      principal: "",
      secundario: "",
    },
    RoleId: 0,
    propertyId: [],
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { enqueueSnackbar } = useSnackbar();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (user) {
      setRoleData({
        ...user,
        principal: user.phoneNumbers.principal || "",
        secundario: user.phoneNumbers.secundario || "",
        ratingPermissions: user.ratingPermissions || [],
        propertyIds: user.ratingPermissions.map((perm) => perm.propertyId) || [], // Inicializar con propiedades permitidas
      });

    }
    const fetchData = async () => {
    try {
      const response = await api.get("/roles");
      const rolOpcion = response.data.map((rol) => {
        return {
          label: rol.name,
          idRol: rol.id,
        };
      }
      );
      setRoles(rolOpcion);
      const response2 = await api.get(`/properties`);
      const propertiesOptions = response2.data.map((property) => {
        return {
          label: property.name,
          id: property.id,
        };
      });
      setProperties(propertiesOptions);
    } catch (error) {
      console.error("Error fetching roles", error.message);
    }
  };
  fetchData();
  }, [user], api);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "principal" || name === "secundario") {
      setRoleData((prevData) => ({
        ...prevData,
        [name]: value || "",
      }));
    } else {
      setRoleData((prevData) => ({
        ...prevData,
        [name]: value || "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await api.put(`/users/${user.id}`, {
        ...roleData,
        phoneNumbers: {
          principal: roleData.principal,
          secundario: roleData.secundario,
        },
      });

      await api.post(`/users/${user.id}/rating-permissions/${roleData.propertyId}`, {
        userId: user.id,
        propertyId: roleData.propertyId,
      });


      enqueueSnackbar("Usuario actualizado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      onUpdate();
    } catch (error) {
      enqueueSnackbar("Error actualizando usuario", {
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
    p: 1,
    margin: "auto",
    mt: 1,
    maxHeight: "80vh",
    overflowY: "auto",
    borderRadius: "10px",
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
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              name="id"
              label="Id"
              value={roleData.id}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="name"
              label="Nombre"
              value={roleData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="lastName"
              label="Primer Apellido"
              value={roleData.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="lastName2"
              label="Segundo Apellido"
              value={roleData.lastName2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="email"
              label="Correo Electrónico"
              value={roleData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              name="password"
              label="Contraseña"
              value={roleData.password || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} sm={3}>
            <TextField
              fullWidth
              required
              name="principal"
              label="Teléfono principal"
              value={roleData.principal || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} sm={3}>
            <TextField
              fullWidth
              name="secundario"
              label="Teléfono secundario"
              value={roleData.secundario || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid xs={12} sm={3}>
            <TextField
              fullWidth
              select
              name="RoleId"
              label="Seleccione un rol"
              value={roles.length > 0 ? roleData.RoleId : ""}
              onChange={handleInputChange}
            >
              {roles.map((rol) => (
                <MenuItem key={rol.idRol} value={rol.idRol}>
                  {rol.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid xs={12} sm={3}>
           <Autocomplete
              fullWidth
              options={properties}
              getOptionLabel={(option) => option.label}
              value={properties.find((property) => property.id === roleData?.ratingPermissions[0]?.id) || null}
              onChange={(event, newValue) => {
                setRoleData((prevData) => ({
                  ...prevData,
                  propertyId: newValue ? newValue.id : 0,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Permisos para comentarios en propiedad"
                  name="propertyId"
                />
              )}
            />
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
