import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import useAuthStore from "../../hooks/auth/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import api from "../../database/api";

const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const persist = useAuthStore((state) => state.persist);
  const setPersist = useAuthStore((state) => state.setPersist);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: "/" };

  const emailRef = useRef();

  const [email, setEmail] = useLocalStorage("correo", "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]); 

  const togglePersist = () => {
    setPersist(!persist);
  };

  const login = async (email, password) => {
    return await api.post(
      "/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const navigateToRolePage = (role) => {
    if (role === "admin" || role === "vendedor") {
      navigate("/admin", { replace: true });
    } else if (role === "cliente") {
      navigate(from);
    } else {
      navigate("login", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      enqueueSnackbar("Inicio de sesión exitoso", { variant: "success" });

      setAuth({
        user: response.data.user,
        accessToken: response.data.accessToken,
      });



      navigateToRolePage(response.data.user.Role.name);
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message || "Error al iniciar sesión"}`, { variant: "error" });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-4xl">
          <img
            className="hidden lg:block lg:w-1/2 brightness-50"
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/402099282.jpg?k=1062818d79cc9e9c82c7be5059e68f4043e0726420b0a39e20b491dbefc34102&o=&hp=1"
            alt="casa pequeña con jardín y piscina"
          />
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl text-center text-gray-700 font-regular">
              Inicio de Sesión
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="mb-6"></div>
                <label
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                  id="correo"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <Link
                  to="/forgot-password"
                  className="float-right mb-6 text-sm text-blue-500"
                >
                  ¿Has olvidado tu contraseña?
                </Link>
              </div>
              <div className="mt-6">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-900"
                  type="submit"
                >
                  Iniciar Sesión
                </button>
              </div>

              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="persist"
                  onChange={togglePersist}
                  checked={persist}
                  className="w-4 h-4 text-[#abcc57] border-[#abcc57] rounded focus:ring-[#abcc57] focus:ring focus:ring-opacity-50"
                />
                <label htmlFor="persist" className="ml-2 text-sm text-black">
                  Mantener sesión iniciada
                </label>
              </div>

              <div className="mt-6">
                <Link to="/register" className="text-sm text-black">
                  ¿Aún no tienes cuenta?{" "}
                  <span className="text-blue-500">Regístrate aquí</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
