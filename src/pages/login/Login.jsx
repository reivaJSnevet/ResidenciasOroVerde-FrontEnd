import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../hooks/auth/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import api from "../../database/api";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const persist = useAuthStore((state) => state.persist);
  const setPersist = useAuthStore((state) => state.setPersist);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: "/" };

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useLocalStorage("correo", "");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setAuth({
        user: response.data.user,
        accessToken: response.data.accessToken,
      });

      if (response.data.user.Role.name === "admin") {
        navigate("/admin", { replace: true });
      } else if (response.data.user.Role.name === "cliente") {
        navigate(from);
      } else {
        navigate("login", { replace: true });
      }
    } catch (error) {
      setErrorMsg("Usuario o contraseña incorrectos");
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist(!persist);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="py-16">
        <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-1/2 brightness-50"
            style={{
              backgroundImage:
                "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/402099282.jpg?k=1062818d79cc9e9c82c7be5059e68f4043e0726420b0a39e20b491dbefc34102&o=&hp=1')",
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl text-center text-gray-700 font-regular">
              Inicio de Sesión
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                {errorMsg && (
                  <p
                    className="p-3 mt-2 text-white bg-red-500 rounded-md errmsg"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errorMsg}
                  </p>
                )}
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
                <p className=" mb-6 float-right text-sm text-black">
                <span className="text-blue-500">
                   <a href="/Admin">¿Olvidaste tu contraseña?</a>
                </span>
              </p>
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
              <div className="mb-6"></div>
              
              <p className="ml-2 text-sm text-black">
                ¿Aún no tienes cuenta?{" "}
                <span className="text-blue-500">
                  Regístrate <a href="/register">aquí</a>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default Login;
