import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

  return (
    <div className="flex items-center justify-center h-screen bg-[#f8f7f2]">
      <div className="text-center">
        {/* <h1 className="mb-4 text-4xl font-bold text-green-800">404</h1> */}
        <p className="mb-8 text-lg text-green-700">Página no encontrada</p>
        <img src="/40dospuntos4-lineas.jpeg" alt="404" className="w-64 mx-auto mb-8" />
        <button 
            className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-green-500 rounded hover:bg-green-600"
            onClick={handleGoBack}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;
