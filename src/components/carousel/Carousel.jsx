import { CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const Item = ({ photo }) => {
  return (
    <CardMedia
      component="img"
      image={photo}
      alt="imagen"
      style={{ width: "100%", height: "auto" }}
    />
  );
};

const CarouselComponent = ({ photos, height = 400 }) => {

  return (
    <Carousel
      autoPlay={true}
      navButtonsAlwaysVisible={false}
      indicators={false}
      height={height}
      
    >
      {
        photos.map((photo, index) => <Item key={index} photo={photo} />)
      }
    </Carousel>
  );
};

export default CarouselComponent;
