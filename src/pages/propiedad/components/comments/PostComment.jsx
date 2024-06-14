import { useState } from "react";
import { useSnackbar } from "notistack";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";

const PostComment = ({ user, propertyId, refresh, setRefresh }) => {
  const api = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();

  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/comments", {
        PropertyId: propertyId,
        content: comment,
        UserId: user.id,
      });
      setRefresh(!refresh);
      enqueueSnackbar("Comentario enviado correctamente", {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(
        error.response.status == 403
          ? "Debes haber alquilado esta propiedad para comentar. Contacta con el agente si ya lo hiciste."
          : "Error al enviar el comentario",
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

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-full mt-4 bg-200 md:mt-8 lg:mt-12"
      onSubmit={handleSubmit}
    >
      <h3 className="mb-2 text-base font-semibold text-gray-800 md:text-lg lg:text-xl ">
        Comenta tu estadía o el trato con el anfitrión
      </h3>
      <textarea
        className="w-10/12 h-32 p-2 bg-white border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-800"
        maxLength={500}
        placeholder="Escribe tu comentario"
        value={comment}
        onChange={handleChange}
      ></textarea>
      <button
        className="w-full p-2 m-4 text-lg font-semibold text-white transition duration-300 ease-in-out bg-green-700 rounded-md md:w-1/2 hover:bg-green-900"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
};

export default PostComment;
