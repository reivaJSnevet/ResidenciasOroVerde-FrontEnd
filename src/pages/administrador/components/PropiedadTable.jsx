import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import api from "../../../database/api";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";

function PropiedadTable() {
  const [propiedades, setPropiedades] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10, 20];

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        const response = await api.get("/propiedades");
        setPropiedades(response.data);
      } catch (error) {
        console.error("Error fetching propiedades", error.message);
      }
    };
    fetchPropiedades();
  }, []);

  const renderCalificacion = (calificacion) => {
    const roundedCalificacion = Math.floor(calificacion);
    const hasHalfStar = calificacion % 1 !== 0;
    const stars = [];

    for (let i = 1; i <= roundedCalificacion; i++) {
      stars.push(<StarIcon className="text-yellow-300" key={i} />);
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalfIcon className="text-yellow-300" key={stars.length + 1} />
      );
    }

    const totalStars = Math.ceil(calificacion);
    const remainingStars = 5 - totalStars;
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(
        <StarOutlineIcon className="text-yellow-300" key={stars.length + 1} />
      );
    }

    return stars;
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "dimensiones",
      headerName: "Dimensiones",
      flex: 1,
    },
    {
      field: "calificacion",
      headerName: "Calificacion",
      flex: 1,
      renderCell: (params) => renderCalificacion(params.value),
    },
    {
      field: "precio",
      headerName: "Precio Venta / Alquiler",
      flex: 1,
      valueGetter: (params) =>
        `$${params.row.precioAlquiler || ""} / ${params.row.precioVenta || ""}`,
    },
    {
      field: "fotos",
      headerName: "Imagenes",
      flex: 1,
      renderCell: (params) => {
        const fotos = Array.isArray(params.row.fotos)
          ? params.row.fotos
          : [params.row.fotos];
        return (
          <Card sx={{ maxWidth: 345 }}>
            {fotos.map((foto, index) => (
              <CardMedia
                key={index}
                component="img"
                image={foto}
                alt={`imagen-${index}`}
                sx={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  marginRight: "5px",
                }}
              />
            ))}
          </Card>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-center mt-14">
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          style={{ height: 500, width: "100%" }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={propiedades}
          getRowId={(row) => row.id}
          loading={propiedades.length === 0}
          columns={columns}
          editMode="row"
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              // csvOptions,
              // printOptions,
            },
          }}
          disableSelectionOnClick
          getRowHeight={() => "auto"}
          pageSize={pageSize}
          rowsPerPageOptions={pageSize}
          initialState={{
            ...propiedades.initialState,
            pagination: { paginationModel: { pageSize } },
          }}
          pageSizeOptions={sizeOptions}
        />
      </div>
    </>
  );
}

export default PropiedadTable;
