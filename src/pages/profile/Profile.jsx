import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Comment, Favorite } from "@mui/icons-material";
import useAuthStore from "../../hooks/auth/useAuth";
import useLogout from "../../hooks/auth/useLogout";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import UserInfo from "./components/UserInfo";
import UserComments from "./components/comments/UserComments";
import FavoriteProperties from "./components/favProperties/FavoriteProperties";

const Navbar = ({ currentSection, setCurrentSection }) => {
  return (
<div className="flex justify-center p-4 bg-gray-200 shadow-md">
  <button
    className={`flex items-center px-4 py-2 mx-2 text-gray-700 border-b-2 transform transition-transform hover:scale-105 ${
      currentSection === "comments"
        ? "border-gray-700 font-semibold"
        : "border-transparent"
    }`}
    onClick={() => setCurrentSection("comments")}
  >
    <Comment className="mr-2" />
    Comentarios
  </button>
  <button
    className={`flex items-center px-4 py-2 mx-2 text-gray-700 border-b-2 transform transition-transform hover:scale-105 ${
      currentSection === "favorites"
        ? "border-gray-700 font-semibold"
        : "border-transparent"
    }`}
    onClick={() => setCurrentSection("favorites")}
  >
    <Favorite className="mr-2" />
    Favoritos
  </button>
</div>

  );
};

const Profile = () => {
  const apiPrivate = useAxiosPrivate();
  const auth = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const [currentSection, setCurrentSection] = useState("comments");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiPrivate.get(`/comments/user/${auth.user.id}`);
        setComments(response.data);
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
   <div className="flex flex-col min-h-screen">
  <div className="relative flex flex-col md:flex-row md:h-1/3">
    <button
      type="button"
      onClick={handleLogout}
      className="absolute px-4 py-2 text-white transition-transform transform bg-red-600 rounded-md top-4 right-4 hover:scale-105"
    >
      Cerrar Sesión
    </button>
    <UserInfo user={auth.user} />
  </div>

  <Navbar
    currentSection={currentSection}
    setCurrentSection={setCurrentSection}
  />

  <div className="flex flex-col flex-grow md:flex-row">
    {currentSection === "comments" ? (
      <div className="flex flex-col p-6 overflow-y-auto custom-scrollbar animate-fade-in">
        <UserComments comments={comments} setComments={setComments} />
      </div>
    ) : (
      <div className="flex flex-col p-6 overflow-y-auto hide-scrollbar animate-fade-in">
        <FavoriteProperties userId={auth.user.id} />
      </div>
    )}
  </div>
</div>
  );
};

export default Profile;
