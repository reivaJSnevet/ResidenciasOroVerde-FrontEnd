const PhotoModal = ({selectedImage, handleCloseModal}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div
        className="w-1/2 overflow-hidden bg-white rounded-lg shadow-lg h-1/2 "
        onClick={handleCloseModal}
      >
        <div className="relative">
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="max-w-full max-h-full rounded-lg"
          />
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-2xl font-bold text-white"
            onClick={handleCloseModal}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
