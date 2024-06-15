import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HouseIcon from "@mui/icons-material/House";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import PropertyStatsCard from "./stats/PropertyStatsCard";
import AvgRatingStatsCard from "./stats/AvgRatingStatsCard";
import RentalAvgStatsCard from "./stats/RentalAvgStatsCard";
import SaleAvgStatsCard from "./stats/SaleAvgStatsCard";
import StatsCard from "./stats/StatsCards";
import DistrictStatsCard from "./stats/DistrictStatsCard"; // Importa el nuevo componente
import { Grid, Box, useTheme } from "@mui/material";

function Administrador() {
  const theme = useTheme();
  const api = useAxiosPrivate();
  const location = useLocation();
  const [usuarios, setUsuarios] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  const [casasAlquiladas, setCasasAlquiladas] = useState([]);
  const [casasVendidas, setCasasVendidas] = useState([]);
  const [promedioVenta, setPromedioVenta] = useState(0);
  const [promedioRenta, setPromedioRenta] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usuariosResponse, propiedadesResponse] = await Promise.all([
          api.get("/users"),
          api.get("/properties"),
        ]);

        const usuariosData = usuariosResponse.data;
        setUsuarios(usuariosData);

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

        const totalVenta = saleProperties.reduce(
          (acc, property) => acc + (property.salePrice || 0),
          0
        );
        const totalRenta = rentalProperties.reduce(
          (acc, property) => acc + (property.rentalPrice || 0),
          0
        );

        const promedioVenta = saleProperties.length
          ? totalVenta / saleProperties.length
          : 0;
        const promedioRenta = rentalProperties.length
          ? totalRenta / rentalProperties.length
          : 0;

        setPromedioVenta(promedioVenta);
        setPromedioRenta(promedioRenta);

        const totalRating = propiedadesData.reduce(
          (acc, property) => acc + (property.rating || 0),
          0
        );
        const avgRating = propiedadesData.length
          ? totalRating / propiedadesData.length
          : 0;
        setAvgRating(avgRating);
      } catch (error) {
        console.error("Error obteniendo los datos", error);
      }
    };

    fetchData();
  }, [api]);

  if (location.pathname !== "/admin") {
    return <Outlet />;
  }

  const iconColor = "#3c6c43";

  // Agrupar las propiedades por distrito
  const propiedadesPorDistrito = (properties) => {
    return properties.reduce((acc, property) => {
      const { district } = property;
      if (!acc[district]) {
        acc[district] = 0;
      }
      acc[district]++;
      return acc;
    }, {});
  };

  const propiedadesAlquiladasPorDistrito =
    propiedadesPorDistrito(casasAlquiladas);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2 }}>
            <div className="mb-4">
            <PropertyStatsCard
              title="Propiedades"
              rentalCount={casasAlquiladas.length}
              saleCount={casasVendidas.length}
            />
            </div>
            <div>
            <DistrictStatsCard
              title="Casas por Distrito"
              districtData={propiedadesAlquiladasPorDistrito}
            />
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} marginTop={10}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StatsCard
                icon={
                  <PeopleAltIcon style={{ fontSize: 32, color: iconColor }} />
                }
                title="Usuarios"
                total={usuarios.length}
              />
            </Grid>
            <Grid item xs={6}>
              <StatsCard
                icon={<HouseIcon style={{ fontSize: 32, color: iconColor }} />}
                title="Propiedades"
                total={propiedades.length}
              />
            </Grid>
            <Grid item xs={6}>
              <RentalAvgStatsCard
                icon={
                  <AttachMoneyIcon style={{ fontSize: 32, color: iconColor }} />
                }
                title="Promedio de Alquiler"
                rentalAvg={promedioRenta}
              />
            </Grid>
            <Grid item xs={6}>
              <SaleAvgStatsCard
                icon={
                  <MonetizationOnIcon
                    style={{ fontSize: 32, color: iconColor }}
                  />
                }
                title="Promedio de Venta"
                saleAvg={promedioVenta}
              />
            </Grid>
            <Grid item xs={12}>
              <AvgRatingStatsCard avgRating={avgRating} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Administrador;
