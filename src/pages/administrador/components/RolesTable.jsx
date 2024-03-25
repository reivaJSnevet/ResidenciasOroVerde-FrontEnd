import { useEffect, useState } from "react";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";

function RolesTable() {
  const api = useAxiosPrivate();
  const [roles, setRoles] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10, 20];

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles", error.message);
      }
    };
    fetchRoles();
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
          rows={roles}
          getRowId={(row) => row.id}
          loading={roles.length === 0}
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
            ...roles.initialState,
            pagination: { paginationModel: { pageSize } },
          }}
          pageSizeOptions={sizeOptions}
        />
      </div>
    </>
  );
}

export default RolesTable;
