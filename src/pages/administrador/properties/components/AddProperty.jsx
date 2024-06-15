import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  FormControlLabel,
  Checkbox,
  Input,
  OutlinedInput,
  ListItemText,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import {
  ExpandMore as ExpandMoreIcon,
  House as HouseIcon,
  HouseOutlined as HouseOutlinedIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import useAuthStore from "../../../../hooks/auth/useAuth";
import ReusableModal from "../../../../components/modal/ReusableModal";
import Map from "./map/Map";
import { create } from "zustand";
import provinciasData from "../../data/data.json";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useFormStore = create((set) => ({
  formData: {
    name: "",
    type: "Point",
    squareMeters: "",
    forRent: false,
    bedroomNum: "",
    bathroomNum: "",
    garage: "",
    rentalPrice: 0,
    salePrice: "",
    description: "",
    restriction: "",
    UserId: 0,
    categoryId: "",
  },
  photos: [],
  setFormData: (newFormData) =>
    set((state) => ({ formData: { ...state.formData, ...newFormData } })),
  resetFormData: (userId) =>
    set(() => ({
      formData: {
        name: "",
        type: "Point",
        squareMeters: "",
        forRent: false,
        bedroomNum: "",
        bathroomNum: "",
        garage: "",
        rentalPrice: 0,
        salePrice: "",
        description: "",
        restriction: "",
        UserId: userId,
        categoryId: "",
      },
    })),
  addPhoto: (photoUrl) =>
    set((state) => ({ photos: [...state.photos, photoUrl] })),
}));

function AddProperty({ reset, setReset }) {
  const api = useAxiosPrivate();
  const { formData, setFormData, resetFormData, addPhoto, photos } =
    useFormStore();
  const { enqueueSnackbar } = useSnackbar();
  const idUsuario = useAuthStore((state) => state.auth.user.id);
  const [coordinates, setCoordinates] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showRentalPrice, setShowRentalPrice] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCanton, setSelectedCanton] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const filteredCantones = selectedProvince
    ? provinciasData.provincias.find(
        (provincia) => provincia.nombre === selectedProvince
      ).cantones
    : [];

  const filteredDistritos =
    selectedProvince && selectedCanton
      ? provinciasData.provincias
          .find((provincia) => provincia.nombre === selectedProvince)
          .cantones.find((canton) => canton.nombre === selectedCanton).distritos
      : [];

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedCanton("");
    setSelectedDistrict("");
  };

  const handleCantonChange = (event) => {
    setSelectedCanton(event.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        enqueueSnackbar("Error cargando categorías", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    };
    setFormData({ UserId: idUsuario });
    fetchData();
  }, [api, idUsuario, setFormData, enqueueSnackbar]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { type, forRent, ...rest } = formData;
    const photosString = photos.join(",");

    try {
      const propertyResponse = await api.post("/properties", {
        ...rest,
        coordinates: {
          coordinates: coordinates
            ? [coordinates.lat, coordinates.lng]
            : [0, 0],
          type,
        },
        forRent,
        squareMeters: formData.squareMeters + "m²",
        photos: photosString,
        province: selectedProvince,
        canton: selectedCanton,
        district: selectedDistrict,
      });

      // Obtener la ID de la propiedad creada desde la respuesta POST
      const propertyId = propertyResponse.data.id;
      console.log("Property ID: ", propertyId);

      // Enviar solicitud POST para agregar categorías a la propiedad
      await api.post(`/properties/${propertyId}/categories`, {
        categoryId: formData.categoryId,
      });

      enqueueSnackbar("Propiedad creada", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      resetFormData(idUsuario);
      setSelectedProvince("");
      setSelectedCanton("");
      setSelectedDistrict("");
      event.target.reset();
      setCoordinates(null);
      setReset(!reset);
    } catch (err) {
      enqueueSnackbar("Error creando propiedad", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      console.log(err);
    }
  };

  const handleCheckboxChange = (event) => {
    setShowRentalPrice(event.target.checked);
    setFormData({ forRent: event.target.checked });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("image", file);

      const promise = fetch(
        "https://api.imgbb.com/1/upload?&key=9fb83d009e500017cc7b8861a69be95a",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const imageUrl = data.data.url;
          addPhoto(imageUrl);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });

      promises.push(promise);
    }

    Promise.all(promises)
      .then(() => {
        setUploadingImages(false);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  const isFormValid = () => {
    return (
      formData.name !== "" &&
      formData.squareMeters !== "" &&
      formData.bedroomNum !== "" &&
      formData.bathroomNum !== "" &&
      formData.garage !== "" &&
      formData.description !== "" &&
      photos.length > 0 &&
      selectedProvince !== "" &&
      selectedCanton !== "" &&
      selectedDistrict !== ""
    );
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Agregar propiedad</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box
            component="form"
            sx={{
              mt: 1,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <Grid container spacing={2} margin={1}>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    required
                    type="text"
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} sm={3}>
                  <Button
                    onClick={handleOpenModal}
                    onChange={handleInputChange}
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: "4px",
                      padding: "14px",
                      width: "100%",
                      color: "#3c6c42",
                    }}
                  >
                    Agregar coordenadas
                  </Button>
                </Grid>

                <Grid xs={12} sm={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Provincia</InputLabel>
                    <Select
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      label="Provincia"
                    >
                      {provinciasData.provincias.map((provincia) => (
                        <MenuItem
                          key={provincia.nombre}
                          value={provincia.nombre}
                        >
                          {provincia.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Cantón</InputLabel>
                    <Select
                      value={selectedCanton}
                      onChange={handleCantonChange}
                      label="Cantón"
                      disabled={!selectedProvince}
                    >
                      {filteredCantones.map((canton) => (
                        <MenuItem key={canton.nombre} value={canton.nombre}>
                          {canton.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Distrito</InputLabel>
                    <Select
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      label="Distrito"
                      disabled={!selectedProvince || !selectedCanton}
                    >
                      {filteredDistritos.map((distrito) => (
                        <MenuItem key={distrito} value={distrito}>
                          {distrito}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    type="text"
                    name="squareMeters"
                    label="m²"
                    variant="outlined"
                    value={formData.squareMeters}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <FormControl
                    variant="outlined"
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: "4px",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showRentalPrice}
                          onChange={handleCheckboxChange}
                          name="forRent"
                          color="success"
                          icon={<HouseOutlinedIcon />}
                          checkedIcon={<HouseIcon />}
                        />
                      }
                      label="Poner la propiedad en renta"
                      labelPlacement="end"
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    name="bedroomNum"
                    label="Cuartos"
                    variant="outlined"
                    value={formData.bedroomNum}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    name="bathroomNum"
                    label="Baños"
                    variant="outlined"
                    value={formData.bathroomNum}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    name="garage"
                    label="Garage"
                    variant="outlined"
                    value={formData.garage}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    required
                    name="categoryId"
                    label="Selecciona una categoría"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={0}>Selecciona una categoría</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    name="salePrice"
                    label="Precio de venta"
                    variant="outlined"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                  />
                </Grid>
                {showRentalPrice && (
                  <Grid xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="number"
                      name="rentalPrice"
                      label="Precio de renta"
                      variant="outlined"
                      value={formData.rentalPrice}
                      onChange={handleInputChange}
                    />
                  </Grid>
                )}
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    type="text"
                    name="description"
                    label="Descripción"
                    variant="outlined"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    name="restriction"
                    label="Restricciones"
                    variant="outlined"
                    value={formData.restriction}
                    onChange={handleInputChange}
                  />
                </Grid>
                
                <Grid xs={12}>
                  <Input
                    type="file"
                    inputProps={{ accept: "image/*", multiple: true }}
                    onChange={handleImageUpload}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                style={{
                  backgroundColor:
                    uploadingImages || !isFormValid() ? "#9e9e9e" : "#3c6c42",
                  color: "#fff",
                  cursor:
                    uploadingImages || !isFormValid()
                      ? "not-allowed"
                      : "pointer",
                }}
                type="submit"
                fullWidth
                disabled={!isFormValid() || uploadingImages}
              >
                Guardar
              </Button>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>

      <ReusableModal
        open={modalOpen}
        onClose={handleCloseModal}
        children={
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            handleCloseModal={handleCloseModal}
          />
        }
      />
    </>
  );
}

export default AddProperty;
