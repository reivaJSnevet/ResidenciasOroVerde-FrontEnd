import { useState } from "react";
import { Send, Cancel } from "@mui/icons-material";

const EditCommentForm = ({ comment, onSave, onCancel }) => {
  const [editContent, setEditContent] = useState(comment.content);

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleSave = () => {
    onSave(comment.id, editContent);
  };

  return (
    <div className="z-10 flex flex-col w-full h-full">
      <textarea
        maxLength={500}
        value={editContent}
        onChange={handleEditChange}
        className="w-full h-full text-base text-gray-800 bg-transparent border-none resize-none focus:outline-none custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex justify-end p-2 border-t border-gray-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (editContent.trim() !== "") {
              handleSave();
            }
          }}
          className="mr-2 text-green-600 hover:text-green-800"
        >
          <Send />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
          className="text-red-600 hover:text-red-800"
        >
          <Cancel />
        </button>
      </div>
    </div>
  );
};

export default EditCommentForm;
