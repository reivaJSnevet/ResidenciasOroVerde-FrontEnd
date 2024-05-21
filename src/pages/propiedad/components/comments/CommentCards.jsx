const CommentCard = ({ comments = [] }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric'/* , hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true */ };
        return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
      };

  return (
    <div className="p-4 bg-300">
      <div className="p-4 bg-200">
      <div className="grid grid-cols-1 gap-4 bg-400 md:grid-cols-2">
        {comments.map((comment, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <div className="flex p-4">
              {/* <img
                src={comment.avatar}
                alt="avatar"
                className="w-12 h-12 mr-4 rounded-full md:w-16 md:h-16"
              /> */}
              <div>
                <h4 className="text-lg font-semibold md:text-xl">
                  {comment.User.name}
                </h4>
                <p
                    className="text-gray-500 md:text-lg md:mt-2" 
                >{comment.content}</p>
              </div>
            </div>
            <div className="p-4">
               <p className="text-gray-500">{formatDate(comment.date)}</p>
            </div>
          </div>
          
        ))}
      </div>
      </div>
    </div>

  );
};

export default CommentCard;
