import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Edit, Delete, ArrowOutward } from "@mui/icons-material";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import EditCommentForm from "./EditCommentForm";

const UserComments = ({comments, setComments}) => {
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
        console.log(`Editar comentario con id: ${comment.id}`);
        setEditComment(comment);
      };
    
      const handleDeleteComment = (commentId) => {
        console.log(`Eliminar comentario con id: ${commentId}`);
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
    <div className="flex flex-col w-full p-4 overflow-y-auto bg-red-200 md:w-1/3 custom-scrollbar">
          <h2 className="mb-4 text-xl">Comentarios</h2>
          {comments.map((comment) => (
            <div
            key={comment.id}
            className="relative m-2 bg-white rounded-md shadow-md p-7 h-52 custom-scrollbar"
          >
            {!editComment && (
              <ArrowOutward
                className="absolute cursor-pointer top-2 right-2"
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
                <p 
                  className="overflow-y-auto text-sm text-gray-800 custom-scrollbar md:text-base lg:text-lg"
                >
                  {comment.content}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 md:text-base lg:text-lg">
                    {formatDate(comment.date)}
                  </p>
                  <div className="flex justify-end">
                    <Edit
                      className="mr-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditComment(comment);
                      }}
                    />
                    <Delete
                      className="cursor-pointer"
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
  )
}

export default UserComments