import { useEffect, useState } from "react";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { Backdrop, CircularProgress, Box, Typography } from "@mui/material";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";

function CategoriasTable() {
  const api = useAxiosPrivate();
  const [categorias, setCategorias] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10, 20];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setTimeout(() => {
          setCategorias(response.data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching categorias", error.message);
      }
    };
    fetchCategorias();
  }, [api]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
    },
  ];

  return (
    <>
      <Backdrop
        sx={{
          color: "#5c7e03",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <CircularProgress color="inherit" />{" "}
          <Typography variant="body1" mt={2} color="inherit">
            Cargando datos...
          </Typography>
        </Box>
      </Backdrop>

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
          rows={categorias}
          getRowId={(row) => row.id}
          //   loading={categorias.length === 0}
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
            ...categorias.initialState,
            pagination: { paginationModel: { pageSize } },
          }}
          pageSizeOptions={sizeOptions}
        />
      </div>
    </>
  );
}

export default CategoriasTable;
