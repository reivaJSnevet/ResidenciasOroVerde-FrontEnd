import { useState } from "react";
import useAxiosPrivate from "../../../../../hooks/auth/useAxiosPrivate";

const PostComment = ({ user }) => {
  const api = useAxiosPrivate();
  const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /* const response = await api.post("/comments", {
        comment: comment,
        user: user,
      }); */
      console.log({user, comment});
    } catch (error) {
      console.error(error);
    }
    }

    const handleChange = (e) => {
    setComment(e.target.value);
    }

  return (
    <form
      className="flex flex-col items-center justify-center h-full bg-200"
      onSubmit={handleSubmit}
    >
      <h3 className=" mb-2 text-lg font-semibold">
        Comenta tu estadía o el trato con el anfitrión
      </h3>
      <textarea
        className="w-10/12 h-32 p-2  bg-white border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-800"
        maxLength={500}
        placeholder="Escribe tu comentario"
        value={comment}
        onChange={handleChange}
      ></textarea>
    <button className="w-full p-2 m-4 bg-green-700 md:w-1/2 text-lg text-white font-semibold rounded-md hover:bg-green-900 transition duration-300 ease-in-out"
        type="submit"       
      >Enviar</button>
    </form>
  );
};

export default PostComment;
