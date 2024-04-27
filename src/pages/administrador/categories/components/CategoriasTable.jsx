import { useEffect, useState } from "react";
import {
  DataGrid,
  esES,
  GridToolbar,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Backdrop, CircularProgress, Box, Typography } from "@mui/material";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import { useSnackbar } from "notistack";
import ReusableDialog from "../../../../components/dialog/ReusableDialog";
import ReusableModal from "../../../../components/modal/ReusableModal";
import UpdateCategory from "./UpdateCategory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


function CategoriasTable({ reset, setReset}) {
  const api = useAxiosPrivate();
  const [categorias, setCategorias] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10, 20];
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
  };

  const handleOpenDeleteDialog = (category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedCategory(null);
    setOpenDeleteDialog(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categories");
        setTimeout(() => {
          setCategorias(response.data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching categorias", error.message);
      }
    };
    fetchCategorias();
  }, [api, reset]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
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

  const handleDeleteCategory = async () => {
    try {
      await api.delete(`/categories/${selectedCategory.id}`);
      enqueueSnackbar("Categoría eliminada con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      handleCloseDeleteDialog();
      setReset(!reset);
    } catch (error) {
      enqueueSnackbar("Error eliminando categoría", {
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
      {/* <Backdrop
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
      </Backdrop> */}

      
        <DataGrid
          sx={{
            boxShadow: 2,
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

      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        title="Editar Categoría"
      >
        <UpdateCategory
          category={selectedCategory}
          onUpdate={() => {
            handleCloseModal();
            setReset((prev) => !prev);
          }}
        />
      </ReusableModal>

      {selectedCategory && (
        <ReusableDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          title="Eliminar Categoría"
          content={`¿Estás seguro de eliminar la categoría ${selectedCategory.name}?`}
          onConfirm={handleDeleteCategory}
        />
      )}
    </>
  );
}

export default CategoriasTable;