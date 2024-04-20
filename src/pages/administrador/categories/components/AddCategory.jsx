import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import Button from "@mui/material/Button";
import { create } from "zustand";
import { useSnackbar } from "notistack";

const useFormStore = create((set) => ({
    formData: {
        name: "",
    },
    setFormData: (newFormData) =>
        set((state) => ({ formData: { ...state.formData, ...newFormData } })),
    resetFormData: () =>
        set(() => ({
        formData: {
            name: "",
        },
        })),
    }));

function AddCategory({ reset, setReset }) {
    const api = useAxiosPrivate();

    const { formData, setFormData, resetFormData } = useFormStore();
    const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post("/categories", formData);
            enqueueSnackbar("Categoría creada con éxito", {
                variant: "success",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            });
            resetFormData();
            setReset(!reset);
        } catch (error) {
            enqueueSnackbar("Error creando categoría", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            });
        }
    }

  return (
   <>
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography>Agregar Categoría</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
            onSubmit={handleSubmit}
            >
            <TextField
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
            />
            <Button type="submit" variant="contained">
                Crear
            </Button>
            </Box>
        </AccordionDetails>
    </Accordion>
   
   </>
  )
}

export default AddCategory