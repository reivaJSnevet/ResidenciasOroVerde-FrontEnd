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
    <div
        className="z-10 flex flex-col w-full h-full bg-white border border-gray-300 rounded-md shadow-md"
    >
      <textarea
        maxLength={500}
        value={editContent}
        onChange={handleEditChange}
        className="w-full h-full p-4 text-sm text-gray-800 bg-transparent border-none resize-none focus:outline-none custom-scrollbar md:text-base lg:text-lg"
        onClick={(e) => e.stopPropagation()}
      />
     <div className="flex justify-end"> 
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (editContent.trim() !== "") {
            handleSave();
          }
        }}
        className="mr-2"
      >
        <Send />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }}
        className=""
      >
        <Cancel />
      </button>
    </div>
    </div>
  );
};

export default EditCommentForm;
