const CommentCard = ({ comments }) => {
  return (
    <div className="bg-300 p-4">
      <h3 className="mb-2 text-lg font-semibold">Comentarios</h3>
      <div className="p-4 bg-200">
      <div className="grid grid-cols-1 gap-4 bg-400 md:grid-cols-2">
        {comments.map((comment, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <div className="flex p-4">
              <img
                src={comment.avatar}
                alt="avatar"
                className="w-12 h-12 mr-4 rounded-full md:w-16 md:h-16"
              />
              <div>
                <h4 className="text-lg font-semibold md:text-xl">
                  {comment.name}
                </h4>
                <p className="text-gray-500">{comment.date}</p>
              </div>
            </div>
            <div className="p-4">
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default CommentCard;
