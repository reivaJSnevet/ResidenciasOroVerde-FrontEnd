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

const CarouselComponent = ({ photos }) => {

  return (
    <Carousel
      autoPlay={false}
      navButtonsAlwaysVisible={true}
      indicators={false}
    >
      {
        photos.map((photo, index) => <Item key={index} photo={photo} />)
      }
    </Carousel>
  );
};

export default CarouselComponent;
