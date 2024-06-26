import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Edit, Delete, ArrowOutward } from "@mui/icons-material";
import useAxiosPrivate from "../../../../hooks/auth/useAxiosPrivate";
import EditCommentForm from "./EditCommentForm";

const UserComments = ({ comments, setComments }) => {
  const apiPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [editComment, setEditComment] = useState(null);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric" /* , hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true */,
    };
    return new Intl.DateTimeFormat("es-ES", options).format(
      new Date(dateString)
    );
  };

  const handlePropertyRedirect = (propertyId) => {
    navigate(`/propiedad/${propertyId}`);
  };

  const handleEditComment = (comment) => {
    setEditComment(comment);
  };

  const handleDeleteComment = async (commentId) => {
    await apiPrivate.delete(`/comments/${commentId}`);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
    enqueueSnackbar("Comentario eliminado", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
    });

  };

  const handleEditSave = async (commentId, content) => {
    try {
      await apiPrivate.put(`/comments/${commentId}`, { content });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, content } : comment
        )
      );
      setEditComment(null);
      enqueueSnackbar("Guardado!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error al guardar", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  const handleEditCancel = () => {
    setEditComment(null);
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Comentarios</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="relative p-4 pr-10 m-2 transition-transform transform bg-white rounded-lg shadow-md h-52 custom-scrollbar hover:scale-105"
          >
            {!editComment && (
              <ArrowOutward
                className="absolute text-gray-600 transition-colors duration-300 cursor-pointer top-2 right-2 hover:text-blue-500 "
                onClick={(e) => {
                  e.stopPropagation();
                  handlePropertyRedirect(comment.PropertyId);
                }}
              />
            )}
            {editComment && editComment.id === comment.id ? (
              <EditCommentForm
                comment={comment}
                onSave={handleEditSave}
                onCancel={handleEditCancel}
              />
            ) : (
              <div className="flex flex-col justify-between h-full">
                <p className="overflow-y-auto text-base text-gray-800 custom-scrollbar">
                  {comment.content}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    {formatDate(comment.date)}
                  </p>
                  <div className="flex items-center space-x-4">
                    <Edit
                      className="text-gray-600 transition-colors duration-300 cursor-pointer hover:text-yellow-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditComment(comment);
                      }}
                    />
                    <Delete
                      className="text-gray-600 transition-colors duration-300 cursor-pointer hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteComment(comment.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserComments;
