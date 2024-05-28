import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../../hooks/auth/useAuth";
import useLogout from "../../hooks/auth/useLogout";

const Profile = () => {
  const auth = useAuthStore((state) => state.auth);
    const navigate = useNavigate();
    const logout = useLogout();

  if (!auth.accessToken) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen">
    {/* Parte superior con avatar, datos de usuario y botón de cerrar sesión */}
    <div className="relative flex flex-col p-6 bg-blue-300 rounded-b-lg md:flex-row md:h-1/3">
      {/* Botón de cerrar sesión */}
      <button
        type="button"
        onClick={handleLogout}
        className="absolute px-4 py-2 text-white bg-red-500 rounded-md shadow-md top-4 right-4">
        Cerrar Sesión
      </button>
      {/* Avatar del usuario */}
      <div className="flex items-center justify-center w-full mb-4 md:w-1/3 md:mb-0">
        <img 
          src="https://via.placeholder.com/250" 
          alt="Avatar del Usuario" 
          className="rounded-full shadow-md w-52 h-52"
        />
      </div>
      {/* Datos del usuario */}
      <div className="flex flex-col justify-center w-full p-6 md:w-2/3">
        <h1 className="mb-4 text-2xl">Perfil del Usuario</h1>
        <div className="flex flex-wrap">
          <label className="w-full p-2 m-2 bg-white rounded-md shadow-md md:w-auto">Nombre: Juan Pérez</label>
          <label className="w-full p-2 m-2 bg-white rounded-md shadow-md md:w-auto">Email: juanprez@example.com</label>
          <label className="w-full p-2 m-2 bg-white rounded-md shadow-md md:w-auto">Teléfono: 2580-8729</label>
        </div>
      </div>
    </div>

    {/* Parte inferior con comentarios y propiedades guardadas */}
    <div className="flex flex-col flex-grow overflow-y-auto md:flex-row">
      {/* Comentarios del usuario */}
      <div className="flex flex-col w-full p-4 overflow-y-auto bg-red-200 md:w-1/3">
        <h2 className="mb-4 text-xl">Comentarios</h2>
        <div className="p-4 m-2 bg-white rounded-md shadow-md">
          <p>Comentario 1: Este es un comentario del usuario...</p>
        </div>
        <div className="p-4 m-2 bg-white rounded-md shadow-md">
          <p>Comentario 2: Otro comentario del usuario...</p>
        </div>
        {/* Añade más comentarios según sea necesario */}
      </div>

      {/* Lista de propiedades guardadas */}
      <div className="flex flex-col w-full p-4 overflow-y-auto bg-green-200 md:w-2/3">
        <h2 className="mb-4 text-xl">Propiedades Guardadas</h2>
        <div className="p-4 m-2 bg-white rounded-md shadow-md">
          <p>Propiedad 1: Detalles de la propiedad guardada...</p>
        </div>
        <div className="p-4 m-2 bg-white rounded-md shadow-md">
          <p>Propiedad 2: Más detalles de otra propiedad...</p>
        </div>
        {/* Añade más propiedades según sea necesario */}
      </div>
    </div>
  </div>
  );
};

export default Profile;
