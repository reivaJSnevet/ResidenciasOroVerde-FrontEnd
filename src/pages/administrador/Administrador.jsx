import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HouseIcon from "@mui/icons-material/House";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import StatsCard from "./stats/StatsCards";
import PropertyStatsCard from "./stats/PropertyStatsCard";
import { Grid } from "@mui/material";

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
        const usuariosResponse = await api.get("/users");
        setUsuarios(usuariosResponse.data);
      } catch (error) {
        console.error("Error obteniendo los usuarios", error);
      }

      try {
        const propiedadesResponse = await api.get("/properties");
        setPropiedades(propiedadesResponse.data);
      } catch (error) {
        console.error("Error obteniendo las propiedades", error);
      }

      try {
        const propertiesResponse = await api.get("/properties");
        const rentalProperties = propertiesResponse.data.filter(
          (property) => property.forRent === true
        );
        setCasasAlquiladas(rentalProperties);
      } catch (error) {
        console.error("Error obteniendo las casas alquiladas", error);
      }

      try {
        const propertiesResponse = await api.get("/properties");
        const saleProperties = propertiesResponse.data.filter(
          (property) => property.forRent === false
        );
        setCasasVendidas(saleProperties);
      } catch (error) {
        console.error("Error obteniendo las casas vendidas", error);
      }
    };

    fetchData();
  }, [api]);

  if (location.pathname !== "/admin") {
    return <Outlet />;
  }

  return (
    <Grid container spacing={2} justifyContent="center" marginTop={8}>
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
  );
}

export default Administrador;
