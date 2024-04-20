import { useEffect, useState } from "react";
import { DataGrid, esES, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { Card, CardMedia } from "@mui/material";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import renderCalificacion from "../../services/renderCalificacion";
import { useSnackbar } from "notistack";
import ReusableDialog from "../../../../components/dialog/ReusableDialog";
import ReusableModal from "../../../../components/modal/ReusableModal";
import UpdateProperty from "./UpdateProperty";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


function PropiedadTable({reset, setReset}) {
  const api = useAxiosPrivate();
  const [propiedades, setPropiedades] = useState([]);
  const pageSize = 5;
  const sizeOptions = [5, 10, 20];
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getPropiedades = async () => {
      try {
        const response = await api.get("/properties");
        setPropiedades(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPropiedades();
  }, [api, reset]);




  
  const columns = [
    {
      field: "name",
      headerName: "Nombre",
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
        ` ${params.row.salePrice || "No se vende"} / ${params.row.rentalPrice || "No se alquila"}`,
    },
    {
      field: "photos",
      headerName: "Imagenes",
      flex: 1,
      renderCell: (params) => {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
        useEffect(() => {
          const photos = Array.isArray(params.row.photos)
            ? params.row.photos
            : params.row.photos.split(",");
  
          const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
              prevIndex === photos.length - 1 ? 0 : prevIndex + 1
            );
          }, 2000);
  
          return () => clearInterval(intervalId);
        }, [params.row.photos]);
  
        const photos = Array.isArray(params.row.photos)
          ? params.row.photos
          : params.row.photos.split(",");
  
        return (
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              image={photos[currentImageIndex]}
              alt={`imagen-${currentImageIndex}`}
              sx={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                marginRight: "5px",
              }}
            />
          </Card>
        );
      },
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
    enqueueSnackbar("Propiedad eliminada con éxito", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
    handleCloseDeleteDialog();
    setReset((prev) => !prev);
  };

  return (
    <>
      
        <DataGrid
          sx={{
            boxShadow: 2,
          }}
          style={{ height: 500, width: "100%" }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={propiedades}
          getRowId={(row) => row.id}
          loading={propiedades.length === 0}
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
            ...propiedades.initialState,
            pagination: { paginationModel: { pageSize } },
          }}
          pageSizeOptions={sizeOptions}
        />
    
          <ReusableModal
            open={openModal}
            handleClose={handleCloseModal}
            children={
              <UpdateProperty
              tittle={"Actualizar Propiedad"} onClose={handleCloseModal}
              />
            }
          >
            {/* <UpdateProperty
              property={selectedProperty}
              onUpdate={() => {
                handleCloseModal();
                setReset((prev) => !prev);
              }}
            /> */}
          </ReusableModal>

          {selectedProperty && (
            <ReusableDialog
              open={openDeleteDialog}
              onClose={handleCloseDeleteDialog}
              title="Eliminar Propiedad"
              content={`¿Estás seguro de que deseas eliminar la propiedad ${selectedProperty.name}?`}
            onConfirm={() => {
              handleDelete();
            }
          }
            />
          )}
    </>
  );
}

export default PropiedadTable;
