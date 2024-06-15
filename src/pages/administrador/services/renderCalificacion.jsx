import { Star, StarOutline, StarHalf } from "@mui/icons-material";

const renderCalificacion = (calificacion) => {
  const roundedCalificacion = Math.floor(calificacion);
  const hasHalfStar = calificacion % 1 !== 0;
  const stars = [];

  for (let i = 1; i <= roundedCalificacion; i++) {
    stars.push(<Star className="text-yellow-300" key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf className="text-yellow-300" key={stars.length + 1} />);
  }

  const totalStars = Math.ceil(calificacion);
  const remainingStars = 5 - totalStars;
  for (let i = 1; i <= remainingStars; i++) {
    stars.push(
      <StarOutline className="text-yellow-300" key={stars.length + 1} />
    );
  }

  return stars;
};

export default renderCalificacion;
