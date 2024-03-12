import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../hooks/auth/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import api from "../../database/api";

const Login = () => {
    const auth = useAuthStore((state) => state.auth);
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
        setPersist(JSON.parse(localStorage.getItem("persist")) || false);
    }, []);

    useEffect(() => {
        setErrorMsg("");
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "/auth/login",
                {
                    correo: email,
                    clave: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            setAuth({
                user: response.data.usuario,
                accessToken: response.data.tokenAcceso,
            });

            if (response.data.usuario.Rol.nombre === "admin") {
                navigate("/admin", { replace: true });
            } else if (response.data.usuario.Rol.nombre === "cliente") {
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

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    return (
        <section
            className="flex flex-col items-center justify-center h-screen"
            style={{ backgroundColor: "#1e1b4b" }}
        >
            <div className="relative">
                <form
                    onSubmit={handleSubmit}
                    className="relative z-10 flex flex-col w-full max-w-md p-4 text-white rounded-lg shadow-md dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mt-n8"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        boxShadow:
                            "0 0 0 3px rgba(156, 72, 255, 0.7), 0 0 0 6px rgba(156, 72, 255, 0.5), 0 0 0 9px rgba(156, 72, 255, 0.3), 0 0 0 12px rgba(156, 72, 255, 0.2)",
                    }}
                >
                    <div className="flex items-center justify-center mb-2">
                        <img src="/about.png" alt="Logo" className="h-60" />
                    </div>
                    <p
                        ref={errRef}
                        className={`${
                            errorMsg ? "errmsg p-3" : "offscreen"
                        } bg-red-500 text-white p-0 rounded-md mt-2`}
                        role="alert"
                        aria-live="assertive"
                    >
                        {errorMsg}
                    </p>
                    <label
                        htmlFor="correo"
                        className="block text-sm font-medium text-white"
                    >
                        Correo
                    </label>
                    <input
                        type="text"
                        id="correo"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    <label
                        htmlFor="password"
                        className="block mt-4 text-sm font-medium text-white"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                        type="submit"
                        className="px-10 py-2 mt-4 text-white transition-colors duration-300 bg-purple-400 bg-opacity-50 shadow-xl rounded-3xl backdrop-blur-md hover:bg-purple-600"
                    >
                        Iniciar sesión
                    </button>
                    <div className="flex items-center mt-2">
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={togglePersist}
                            checked={persist}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring focus:ring-opacity-50"
                        />
                        <label
                            htmlFor="persist"
                            className="ml-2 text-sm text-white"
                        >
                            Mantener sesión iniciada
                        </label>
                    </div>

                    <p className="mt-2 text-white">
                        ¿Olvidaste tu contraseña?{" "}
                        <span className="text-blue-500">
                            Recupérala <a href="/Admin">aquí</a>
                        </span>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;
