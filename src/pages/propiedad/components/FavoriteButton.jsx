import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FavoriteButton = ({ isFavorite, setIsFavorite, handleFavorite }) => {
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    handleFavorite();
  };

  return (
    <IconButton onClick={handleFavoriteClick} color="primary">
      <FavoriteIcon style={{ color: isFavorite ? "red" : "grey" }} />
    </IconButton>
  );
};

export default FavoriteButton;
