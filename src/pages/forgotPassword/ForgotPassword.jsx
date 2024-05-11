import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postForgotPassword } from "../../database/services/forgotPassword/useForgotPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msgTextColor, setMsgTextColor] = useState("text-green-800");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postForgotPassword(email);
      setMsgTextColor("text-green-800");
      setMsg(
        "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña."
      );
    } catch (error) {
      setMsgTextColor("text-red-800");
      setMsg("No se encontró el correo electrónico. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50 ">
      <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
        <div className="px-4 py-2 bg-[#abcc5779]">
          <h2 className="text-xl font-bold text-gray-800">
            ¿Has olvidado tu contraseña?
          </h2>
        </div>
        <div className="relative max-w-md px-4 py-3 borderrounded ">
          <span className="block sm:inline">
            Por favor, introduce tu <strong>correo electrónico</strong> para que
            podamos enviarte un enlace de recuperación.
          </span>
          <form className="relative mt-6" onSubmit={handleSubmit}>
            <label
              className="block mb-2 font-semibold text-gray-700"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              className="w-full px-3 py-2 mb-1 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Ingrese su correo"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {msg && (
              <div
                className={`flex items-center justify-center text-center font-semibold text-sm ${msgTextColor}`}
              >
                {msg}
              </div>
            )}
            <div className="flex flex-col items-center justify-center mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-green-700 rounded hover:bg-green-900">
                Buscar correo
              </button>
              <button
                className="w-full px-4 py-2 text-sm font-semibold text-white bg-red-800 rounded hover:bg-red-900"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;