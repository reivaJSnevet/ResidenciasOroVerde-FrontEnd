import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-xl p-10 text-center bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-semibold text-green-800">Unauthorized</h2>
        <p className="text-lg text-gray-700">Lo siento, no estás autorizado para acceder a esta página.</p>
        <button 
          onClick={handleGoBack}
          className="px-4 py-2 mt-6 text-white bg-green-700 rounded-md shadow-md hover:bg-green-900 focus:outline-none focus:ring focus:ring-green-800 "
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
