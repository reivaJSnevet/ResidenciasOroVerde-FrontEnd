import { useEffect, useState } from "react";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import renderCalificacion from "../../services/renderCalificacion";

function RentalTable() {
  const api = useAxiosPrivate();
  const [rental, setRental] = useState([]);
  const pageSize = 10;
   const sizeOptions = [10, 20, 30];
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await api.get("/properties");
        const rentalProperties = response.data.filter(
          (property) => property.forRent === true
        );
        setRental(rentalProperties);
      } catch (error) {
        enqueueSnackbar("Error obteniendo las propiedades en renta", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
    };
    fetchRental();
  }, [api]);

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Tipo de propiedad",
      renderCell: (params) => {
        return params.row.forRent ? "Alquiler" : "Venta";
      },
      flex: 1,
    },
    {
      field: "squareMeters",
      headerName: "Dimensiones",
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Calificacion",
      flex: 1,
      renderCell: (params) => renderCalificacion(params.value),
    },
    {
      field: "prices",
      headerName: "Precio Venta / Alquiler $",
      flex: 1,
      valueGetter: (params) =>
        ` ${params.row.salePrice || "No se vende"} / ${
          params.row.rentalPrice || "No se alquila"
        }`,
    },
  ];

  return (
    <>
      <DataGrid
        sx={{
          boxShadow: 2,
        }}
        style={{ height: 500, width: "100%" }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={rental}
        getRowId={(row) => row.id}
        loading={rental.length === 0}
        columns={columns}
        editMode="row"
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        disableSelectionOnClick
        getRowHeight={() => "auto"}
        pageSize={pageSize}
        rowsPerPageOptions={pageSize}
        initialState={{
          ...rental.initialState,
          pagination: { paginationModel: { pageSize } },
          columns: {
            columnVisibilityModel: {
              rating: window.innerWidth < 768 ? false : true,
              prices: window.innerWidth < 768 ? false : true,
            },
          },
        }}
        pageSizeOptions={sizeOptions}
      />
    </>
  );
}

export default RentalTable;
