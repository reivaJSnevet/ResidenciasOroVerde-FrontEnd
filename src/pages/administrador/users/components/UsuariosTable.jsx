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
import ReusableModal from "../../../../components/modal/ReusableModal";
import { useSnackbar } from "notistack";
import ReusableDialog from "../../../../components/dialog/ReusableDialog";
import UpdateUser from "./UpdateUser";


function UsuariosTable({ reset, setReset }) {
  const api = useAxiosPrivate();
  const [usuarios, setUsuarios] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10, 20];
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
  }, [api, reset]);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUser(null);
    setOpenDeleteDialog(false);
  };

  const { enqueueSnackbar } = useSnackbar();

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
      valueGetter: (params) =>
        params.row.phoneNumbers?.principal || "Sin Datos",
    },
    {
      field: "phoneNumbers.secundario",
      headerName: "Teléfono Secundario",
      flex: 1,
      valueGetter: (params) =>
        params.row.phoneNumbers?.secundario || "Sin Datos",
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
      await api.delete(`/users/${selectedUser.id}`);
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
      <DataGrid
        sx={{
          boxShadow: 2,
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

     <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        title="Editar Usuario"
        children={<UpdateUser 
          tittle={"Actualizar Usuario"}
          onClose={handleCloseModal}
          user={selectedUser}
          onUpdate={() => {
            handleCloseModal();
            setReset((prev) => !prev);
          }}
        />}
      >
      </ReusableModal>

      {selectedUser && (
        <ReusableDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          title="Eliminar Usuario"
          content={`¿Estás seguro de eliminar a ${selectedUser.name} ${selectedUser.lastName}?`}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

export default UsuariosTable;
