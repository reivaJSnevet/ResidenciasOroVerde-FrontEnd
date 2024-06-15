import { useEffect, useState } from "react";
import {
  DataGrid,
  esES,
  GridToolbar,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateRol from "./UpdateRol";
import ReusableModal from "../../../../components/modal/ReusableModal";
import { useSnackbar } from "notistack";
import ReusableDialog from "../../../../components/dialog/ReusableDialog";
import { Box } from "@mui/material";

function RolesTable({ reset, setReset }) {
  const api = useAxiosPrivate();
  const [roles, setRoles] = useState([]);
  const pageSize = 10;
   const sizeOptions = [10, 20, 30];
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleOpenModal = (role) => {
    setSelectedRole(role);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRole(null);
  };

  const handleOpenDeleteDialog = (role) => {
    setSelectedRole(role);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedRole(null);
    setOpenDeleteDialog(false);
  };

  const { enqueueSnackbar } = useSnackbar();

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
  }, [api, reset]);

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      flex: 1,
      cellClassName: "actions",
      renderCell: (params) => {
        return (
          <div>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Editar"
              onClick={() => {
                handleOpenModal(params.row);
              }}
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar"
              onClick={() => {
                handleOpenDeleteDialog(params.row);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete = async () => {
    try {
      await api.delete(`/roles/${selectedRole.id}`);
      enqueueSnackbar("Rol eliminado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      handleCloseDeleteDialog();
      setReset((prev) => !prev);
    } catch (error) {
      enqueueSnackbar("Error eliminando rol", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <DataGrid
            sx={{
              boxShadow: 2,
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
        </Box>
      </Box>

      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        title="Editar Rol"
        children={
          <UpdateRol
            tittle={"Actualizar Rol"}
            onClose={handleCloseModal}
            role={selectedRole}
            onUpdate={() => {
              handleCloseModal();
              setReset((prev) => !prev);
            }}
          />
        }
      ></ReusableModal>

      {selectedRole && (
        <ReusableDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          title={`Eliminar Rol`}
          content={`¿Está seguro de que desea eliminar el rol con ID ${selectedRole.name}?`}
          onConfirm={() => {
            handleDelete();
            setReset((prev) => !prev);
          }}
        />
      )}
    </>
  );
}

export default RolesTable;
