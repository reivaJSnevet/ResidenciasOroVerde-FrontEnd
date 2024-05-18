const PhotoModal = ({selectedImage, handleCloseModal}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className= "max-w-[90vh] max-h-[90vh] overflow-auto custom-scrollbar bg-transparent rounded-lg shadow-lg"
        onClick={handleCloseModal}
      >
        <div className="relative">
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="rounded-lg"
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
