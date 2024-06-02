import { useState } from "react";
import { Edit, Delete, ArrowOutward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import EditCommentForm from "./EditCommentForm";

const UserComments = ({comments, setComments}) => {
    const apiPrivate = useAxiosPrivate();
    const navigate = useNavigate();
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
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleEditCancel = () => {
        setEditComment(null);
      };
    

  return (
    <div className="flex flex-col w-full p-4 overflow-y-auto bg-red-200 md:w-1/3">
          <h2 className="mb-4 text-xl">Comentarios</h2>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="relative m-2 bg-white rounded-md shadow-md p-7"
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
                <div>
                  <p>{comment.content}</p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="pt-2 text-gray-500">
                      {formatDate(comment.date)}
                    </p>
                    <div className="flex justify-end pt-2">
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