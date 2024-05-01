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
      <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-4xl">
        <img
          className="hidden object-cover lg:block lg:w-1/2 brightness-50"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
          alt="casa olvidada"
        />
        <div className="w-full p-10 lg:w-1/2">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            ¿Has olvidado tu contraseña?
          </h2>
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
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Ingrese su correo"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="flex flex-col items-center justify-center mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-green-800 rounded hover:bg-green-900">
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
          {msg && (
            <div
              className={`flex items-center justify-center mt-10 text-center font-semibold ${msgTextColor}`}
            >
              {msg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
