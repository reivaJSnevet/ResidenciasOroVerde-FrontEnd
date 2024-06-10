import formatDate from "./services/formatDate";

const CommentCards = ({ comments = [] }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 bg-400 md:grid-cols-2">
        {comments.map((comment, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <div className="flex p-4">
              <div>
                <h4 className="text-lg font-semibold md:text-xl">
                  {comment.User.name}
                </h4>
                <p className="text-gray-500 md:text-lg md:mt-2">
                  {comment.content}
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-500">{formatDate(comment.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentCards;
