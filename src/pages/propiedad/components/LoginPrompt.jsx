import { Link } from "react-router-dom";

const LoginPrompt = ({resource}) => {
  return (
      <div className="p-6 text-center bg-white rounded shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Por favor, inicia sesión</h2>
        <p className="mb-4">
          Para poder ver {resource}, necesitas iniciar sesión.
        </p>
        <Link
          to="/login"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Iniciar sesión
        </Link>
      </div>
  );
};

export default LoginPrompt;
