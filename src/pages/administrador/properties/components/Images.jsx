import { useState, useEffect, useRef } from "react";
import { Box, ImageList, ImageListItem, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../../../database/api";
import { useSnackbar } from "notistack";

function Images({ propertyPhotos, onClose, onUpdate }) {
  const photosArray = propertyPhotos.photos.split(",");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const imageRefs = useRef([]);
  const { enqueueSnackbar } = useSnackbar();

  const containerWidth = 400;

  const calculateContainerHeight = () => {
    const maxHeight = Math.max(
      ...imageRefs.current.map((item) => item.clientHeight || 0)
    );
    setContainerHeight(maxHeight);
  };

  useEffect(() => {
    calculateContainerHeight();
    window.addEventListener("resize", calculateContainerHeight);

    return () => {
      window.removeEventListener("resize", calculateContainerHeight);
    };
  }, [photosArray]);
  useEffect(() => {
    if (imageRefs.current[currentImageIndex]) {
      setContainerHeight(imageRefs.current[currentImageIndex].clientHeight);
    }
  }, [currentImageIndex]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? photosArray.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === photosArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageDelete = () => {
    try {
      api.put(`/properties/${propertyPhotos.id}`, {
        photos: photosArray
          .filter((photo, index) => index !== currentImageIndex)
          .join(","),
      });
      onClose();
      enqueueSnackbar("Imagen Eliminada", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      onUpdate();
    } catch (error) {
      console.error("Error updating property", error.message);
    }
  };

  const handleImageLoad = () => {
    calculateContainerHeight();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: containerWidth,
          height: containerHeight,
          border: "2px solid #ccc",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 4,
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
          onClick={goToPreviousImage}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <ImageList
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            overflow: "hidden",
            position: "relative",
          }}
          cols={1}
        >
          {photosArray.map((photo, index) => (
           <ImageListItem
           key={index}
           className="image-item"
           ref={(el) => (imageRefs.current[index] = el)}
           sx={{
             width: "100%",
             height: "auto",
             display: currentImageIndex === index ? "block" : "none",
             margin: "0 auto",
           }}
         >
           <img
             src={photo.trim()}
             alt={`Imagen ${index}`}
             onLoad={handleImageLoad} // Cambio aquí
             style={{
               width: "100%",
               height: "auto",
               display: "block",
               margin: "0 auto",
             }}
           />
         </ImageListItem>
          ))}
        </ImageList>

        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
          onClick={goToNextImage}
        >
          <NavigateNextIcon />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
          onClick={() => handleImageDelete(photosArray[currentImageIndex])}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Images;
