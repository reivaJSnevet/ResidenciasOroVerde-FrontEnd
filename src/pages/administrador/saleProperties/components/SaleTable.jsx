import { useEffect, useState } from "react";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import renderCalificacion from "../../services/renderCalificacion";

function SaleTable() {
  const api = useAxiosPrivate();
  const [sale, setSale] = useState([]);
  const pageSize = 10;
   const sizeOptions = [10, 20, 30];
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await api.get("/properties");
        const saleProperties = response.data.filter(
          (property) => property.forRent === false
        );
        setSale(saleProperties);
      } catch (error) {
        enqueueSnackbar("Error obteniendo las propiedades en venta", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
    };
    fetchSale();
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
        rows={sale}
        getRowId={(row) => row.id}
        loading={sale.length === 0}
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
          ...sale.initialState,
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

export default SaleTable;
