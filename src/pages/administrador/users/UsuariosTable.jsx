import { useEffect, useState } from "react";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";

function UsuariosTable() {
  const api = useAxiosPrivate();
  const [usuarios, setUsuarios] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10, 20];

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("/users");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error fetching usuarios", error.message);
      }
    };
    fetchUsuarios();
  }, [api]);

  const columns = [
    {
      field: "id",
      headerName: "Cedula",
      flex: 1,
    },
    {
      field: "nombreCompleto",
      headerName: "Nombre Completo",
      flex: 1,
      valueGetter: (params) => {
        return `${params.row.name || ""} ${params.row.lastName || ""} ${
          params.row.lastName2 || ""
        }`;
      },
    },
    {
      field: "email",
      headerName: "Correo Electronico",
      flex: 1,
    },
    {
      field: "phoneNumbers.principal",
      headerName: "Teléfono Principal",
      flex: 1,
      valueGetter: (params) => params.row.phoneNumbers?.principal || "Sin Datos",
    },
    {
      field: "phoneNumbers.secundario",
      headerName: "Teléfono Secundario",
      flex: 1,
      valueGetter: (params) => params.row.phoneNumbers?.secundario || "Sin Datos",
    },
    
  ];

  return (
    <>
      <div className="flex justify-center mt-20">
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
          rows={usuarios}
          getRowId={(row) => row.id}
          loading={usuarios.length === 0}
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
            ...usuarios.initialState,
            pagination: { paginationModel: { pageSize } },
          }}
          pageSizeOptions={sizeOptions}
        />
      </div>
    </>
  );
}

export default UsuariosTable;
