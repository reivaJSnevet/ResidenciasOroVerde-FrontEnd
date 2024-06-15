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
import UpdateProperty from "./UpdateProperty";
import renderCalificacion from "../../services/renderCalificacion";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Images from "./Images";
import { Box } from "@mui/material";

function PropiedadTable({ reset, setReset }) {
  const api = useAxiosPrivate();
  const [properties, setProperties] = useState([]);
  const pageSize = 10;
  const sizeOptions = [10, 20, 30];
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyPhotos, setSelectedPropertyPhotos] = useState([]);
  const [openImages, setOpenImages] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties", error.message);
      }
    };
    fetchProperties();
  }, [api, reset, selectedPropertyPhotos]);

  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProperty(null);
  };

  const handleOpenDeleteDialog = (property) => {
    setSelectedProperty(property);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedProperty(null);
    setOpenDeleteDialog(false);
  };

  const handleCloseImages = () => {
    setSelectedProperty(null);
    setOpenImages(false);
  };

  const { enqueueSnackbar } = useSnackbar();

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
              icon={<PhotoCamera />}
              label="Fotos"
              onClick={() => {
                setSelectedPropertyPhotos(params.row);
                setOpenImages(true);
              }}
            />
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

  const handleDeleteProperty = async () => {
    try {
      await api.delete(`/properties/${selectedProperty.id}`);
      enqueueSnackbar("Propiedad eliminada con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setReset(!reset);
    } catch (error) {
      enqueueSnackbar("Error eliminando propiedad", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
    handleCloseDeleteDialog();
  };

  return (
    <>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <DataGrid
             sx={{
              boxShadow: 2,
            }}
            style={{ height: 500, width: "100%" }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={properties}
            getRowId={(row) => row.id}
            loading={properties.length === 0}
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
            rowsPerPageOptions={sizeOptions}
            initialState={{
              ...properties.initialState,
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
        </Box>
      </Box>

      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        children={
          <UpdateProperty
            tittle={"Actualizar propiedad"}
            onClose={handleCloseModal}
            property={selectedProperty}
            onUpdate={() => {
              handleCloseModal();
              setReset((prev) => !prev);
            }}
          />
        }
      >
      </ReusableModal>

      <ReusableModal
        open={openImages}
        onClose={() => setOpenImages(false)}
        children={
          <Images
            propertyPhotos={selectedPropertyPhotos}
            onClose={handleCloseImages}
            onUpdate={() => {
              handleCloseImages();
              setReset((prev) => !prev);
            }}
          />
        }
      />

      {selectedProperty && (
        <ReusableDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          title="Eliminar propiedad"
          content={`¿Estás seguro de que deseas eliminar la propiedad ${selectedProperty.name}?`}
          onConfirm={handleDeleteProperty}
        />
      )}
    </>
  );
}

export default PropiedadTable;
