import { useEffect, useState } from "react";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { Card, CardMedia } from "@mui/material";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import renderCalificacion from "../services/renderCalificacion";

function PropiedadTable() {
  const api = useAxiosPrivate();
  const [propiedades, setPropiedades] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10, 20];

  useEffect(() => {
    const getPropiedades = async () => {
      try {
        const response = await api.get("/propiedades");
        setPropiedades(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPropiedades();
  }, [api]);

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
          : params.row.fotos.split(",");
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
