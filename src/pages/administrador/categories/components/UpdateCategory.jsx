import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate"
import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import { Button, Typography, TextField, AccordionDetails } from "@mui/material"
import Box from "@mui/material/Box"
import { useMediaQuery, useTheme } from "@mui/material"

function UpdateCategory({ category, onUpdate }) {
    const api = useAxiosPrivate()
    const [categoryData, setCategoryData] = useState({
        name: "",
    })
    const { enqueueSnackbar } = useSnackbar()
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    useEffect(() => {
        if (category) {
            setCategoryData(category)
        }
    }, [category])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.put(`/categories/${category.id}`, categoryData)
            enqueueSnackbar("Categoría actualizada con éxito", {
                variant: "success",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            })
            onUpdate()
        } catch (error) {
            enqueueSnackbar("Error actualizando categoría", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
            })
        }
    }

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isSmallScreen ? "90%" : "75%",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    }



  return (
   <>
    <Box sx={style}>
        <Typography variant="h5" align="center" gutterBottom>
            Actualizar Categoría
        </Typography>
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="Nombre"
                name="name"
                value={categoryData.name}
                onChange={handleInputChange}
            />
                  <Button
          variant="contained"
          style={{ backgroundColor: "#3c6c42", color: "#fff" }}
          type="submit"
          fullWidth
        >
          Guardar
        </Button>
        </form>
    </Box>
   
   </>
  )
}

export default UpdateCategory