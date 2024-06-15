import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HouseIcon from "@mui/icons-material/House";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import StatsCard from "./stats/StatsCards";
import PropertyStatsCard from "./stats/PropertyStatsCard";
import { Grid, Box } from "@mui/material";

function Administrador() {
  const api = useAxiosPrivate();
  const location = useLocation();
  const [usuarios, setUsuarios] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  const [casasAlquiladas, setCasasAlquiladas] = useState([]);
  const [casasVendidas, setCasasVendidas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usuariosResponse, propiedadesResponse] = await Promise.all([
          api.get("/users"),
          api.get("/properties"),
        ]);

        setUsuarios(usuariosResponse.data);
        const propiedadesData = propiedadesResponse.data;
        setPropiedades(propiedadesData);

        const rentalProperties = propiedadesData.filter(
          (property) => property.forRent === true
        );
        setCasasAlquiladas(rentalProperties);

        const saleProperties = propiedadesData.filter(
          (property) => property.forRent === false
        );
        setCasasVendidas(saleProperties);

      } catch (error) {
        console.error("Error obteniendo los datos", error);
      }
    };

    fetchData();
  }, [api]);

  if (location.pathname !== "/admin") {
    return <Outlet />;
  }

  return (
    <Box sx={{ overflow: "auto", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 1200, padding: 2 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={8}>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              icon={<PeopleAltIcon style={{ fontSize: 50 }} />}
              title="Usuarios"
              total={usuarios.length}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              icon={<HouseIcon style={{ fontSize: 50 }} />}
              title="Propiedades"
              total={propiedades.length}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PropertyStatsCard
              title="Casas"
              rentalCount={casasAlquiladas.length}
              saleCount={casasVendidas.length}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Administrador;
