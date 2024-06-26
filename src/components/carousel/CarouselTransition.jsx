import Carousel from "react-material-ui-carousel";
 
export function CarouselTransition() {
  
  return (
    <Carousel transition={{ duration: 1 }} className="mx-6 rounded-lg">
      <img
        src="/Homepotrero.jpeg"
        alt="image 1"
        className="object-cover w-full h-full" 
      />
     <img
        src="https://i.pinimg.com/originals/23/13/a6/2313a604e3fae0422490987db2a25a15.jpg "
        alt="image 2"
        className="object-cover w-full h-full" 
      />
      <img
        src="https://i.pinimg.com/originals/0a/61/bb/0a61bb1710e152a226d7830f4fd2feda.jpg"
        alt="image 3"
        className="object-cover w-full h-full" 
      />
      <img
        src="/Villapinilla.jpg"
        alt="image 4"
        className="object-cover w-full h-full" 
      />
    </Carousel>
  );
}