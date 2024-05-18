import { useState, useEffect } from "react";
import { ImageList, ImageListItem } from "@mui/material";
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
  const [selectedImage, setSelectedImage] = useState("");
  const [photosUrls, setPhotosUrls] = useState([]);

  useEffect(() => {
    if (!photos) return;
    const imageUrls = photos?.split(",");
    setPhotosUrls(imageUrls);
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
        cols={3}
        rowHeight={205}
      >
        {photosUrls &&
          photosUrls.map((photo, index) => (
            <ImageListItem key={index}>
              <img
                src={photo}
                alt={`Imagen ${index + 1}`}
                loading="lazy"
                className="transition-transform duration-300 rounded-md cursor-pointer hover:scale-90 hover:shadow-xl hover:z-10"
                onClick={() => handleImageClick(photo)}
              />
            </ImageListItem>
          ))}
      </ImageList>

      {selectedImage && (
        <PhotoModal
          selectedImage={selectedImage}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PhotosGallery;
