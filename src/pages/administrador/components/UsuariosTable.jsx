import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";

function UsuariosTable() {
  const api = useAxiosPrivate();
  const [usuarios, setUsuarios] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10, 20];

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("/usuarios");
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
        return `${params.row.nombre || ""} ${params.row.apellido1 || ""} ${
          params.row.apellido2 || ""
        }`;
      },
    },
    {
      field: "correo",
      headerName: "Correo Electronico",
      flex: 1,
    },
    {
      field: "telefonoPrincipal",
      headerName: "Teléfono Principal",
      flex: 1,
      valueGetter: (params) => params.row.telefonos?.principal || "Sin Datos",
    },
    {
      field: "telefonoSecundario",
      headerName: "Teléfono Secundario",
      flex: 1,
      valueGetter: (params) => params.row.telefonos?.secundario || "Sin Datos",
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
          rows={usuarios}
          getRowId={(row) => row.id}
          loading={usuarios.length === 0}
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
