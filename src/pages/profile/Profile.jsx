import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../hooks/auth/useAuth";
import useLogout from "../../hooks/auth/useLogout";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import UserInfo from "./components/UserInfo";
import UserComments from "./components/UserComments";

const Profile = () => {
  const apiPrivate = useAxiosPrivate();
  const auth = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiPrivate.get(`/comments/user/${auth.user.id}`);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [apiPrivate, auth.user.id]);

  if (!auth.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

 
  return (
    <div className="flex flex-col h-screen">
      <div className="relative flex flex-col p-6 bg-blue-300 rounded-b-lg md:flex-row md:h-1/3">
        <button
          type="button"
          onClick={handleLogout}
          className="absolute px-4 py-2 text-white bg-red-500 rounded-md shadow-md top-4 right-4"
        >
          Cerrar Sesión
        </button>
        <UserInfo user={auth.user} />
      </div>

      <div className="flex flex-col flex-grow overflow-y-auto md:flex-row">
        
        <UserComments comments={comments} setComments={setComments} />

        <div className="flex flex-col w-full p-4 overflow-y-auto bg-green-200 md:w-2/3">
          <h2 className="mb-4 text-xl">Propiedades Guardadas</h2>
          <div className="p-4 m-2 bg-white rounded-md shadow-md">
            <p>Propiedad 1: Detalles de la propiedad guardada...</p>
          </div>
          <div className="p-4 m-2 bg-white rounded-md shadow-md">
            <p>Propiedad 2: Más detalles de otra propiedad...</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
