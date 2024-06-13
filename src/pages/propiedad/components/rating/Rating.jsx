import { useState, useEffect } from "react";
import { Rating as MRating } from "@mui/material";
import { useSnackbar } from "notistack";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";

const Rating = ({ ratings = [], propertyId, userId, refresh, setRefresh }) => {
  const { enqueueSnackbar } = useSnackbar();
  const api = useAxiosPrivate();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (ratings.length > 0) {
      const rating = ratings.find(
        (property) => property.Rating.PropertyId === propertyId
      );
      if (rating) {
        setValue(rating.Rating.score);
      } else {
        setValue(0);
      }
    }
  }, [ratings, propertyId]);

  const handleRatingChange = async (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
    const rating = ratings.find(
      (property) => property.Rating.PropertyId === propertyId
    );
    try {
      if (rating) {
        await api.put(`/ratings/${rating.Rating.id}`, {
          score: newValue,
          UserId: userId,
          PropertyId: propertyId,
        });
        enqueueSnackbar("Rating actualizado correctamente", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setRefresh(!refresh);
      } else {
        await api.post("/ratings", {
          PropertyId: propertyId,
          UserId: userId,
          score: newValue,
        });
        enqueueSnackbar("Rating enviado correctamente", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(
        error.response.status == 403
          ? "Debes haber alquilado esta propiedad para calificarla. Contacta con el agente si ya lo hiciste."
          : "Error al enviar el rating",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-start w-full mb-4">
      <MRating
        name="propertyRating"
        precision={0.1}
        value={value}
        onChange={handleRatingChange}
        className="mr-2"
      />
      <span className="text-sm font-semibold text-gray-800">
        {value === 0 ? "Sin calificar" : value}
      </span>
    </div>
  );
};

export default Rating;
