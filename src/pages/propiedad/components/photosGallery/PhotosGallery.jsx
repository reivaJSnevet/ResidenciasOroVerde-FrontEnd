import { useState, useEffect } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import setGridSpace from "../../services/setGridSpace";
import PhotoModal from "./PhotoModal";

/**
 * Renders a gallery of photos.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.photos - The comma-separated list of photo URLs.
 * @returns {JSX.Element} The rendered PhotosGallery component.
 */
const PhotosGallery = ({ photos }) => {
  const [imageConfigs, setImageConfigs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const imageUrls = photos?.split(",");
    if (imageUrls) {
      setGridSpace(imageUrls)
        .then((results) => {
          setImageConfigs(results);
        })
        .catch((error) => {
          console.error("Error setting grid space:", error);
        });
    }
  }, [photos]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <ImageList
        sx={{ width: "auto", height: 450, padding: 2 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
        gap={8}
      >
        {imageConfigs.map((item, index) => (
          <ImageListItem key={index} cols={item.cols} rows={item.rows}>
            <img
              src={item.src}
              srcSet={item.srcSet}
              alt={`Imagen ${index + 1}`}
              loading="lazy"
              className="transition-transform duration-300 cursor-pointer rounded-3xl hover:scale-90 hover:shadow-xl hover:z-10"
              onClick={() => handleImageClick(item.src)}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {selectedImage && PhotoModal({ selectedImage, handleCloseModal })}
    </div>
  );
};

export default PhotosGallery;
