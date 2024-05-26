import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../database/api";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgTextColor, setMsgTextColor] = useState("text-green-800");
  const [msg, setMsg] = useState("");

  const comparePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      comparePasswords(password, confirmPassword);
        await api.post( `auth/reset-password/${token}`, {password});
      setMsgTextColor("text-green-800");
      setMsg(
        "La contraseña se ha restablecido correctamente. Por favor, inicia sesión."
      );
    } catch (error) {
      setMsgTextColor("text-red-800");
      setMsg("No se pudo restablecer la contraseña. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl" style={{ borderRadius: '9px', boxShadow: '4px 4px 8px #d9d9d9, -4px -4px 8px #ffffff' }}>
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Reiniciar Contraseña
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Por favor, introduce tu nueva contraseña.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Nueva contraseña
            </label>
            <input
              className="w-full p-3 bg-gray-200 rounded-lg shadow-inner focus:bg-gray-100 focus:outline-none"
              type="password"
              placeholder="Ingrese su nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: '5px' }}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Confirmar contraseña
            </label>
            <input
              className="w-full p-3 bg-gray-200 rounded-lg shadow-inner focus:bg-gray-100 focus:outline-none"
              type="password"
              placeholder="Confirme su nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ borderRadius: '5px' }}
            />
          </div>
          <button
            className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
            style={{ borderRadius: '5px', boxShadow: '4px 4px 8px #cbced1, -4px -4px 8px #ffffff' }}
          >
            Reiniciar contraseña
          </button>
        </form>
        {msg && (
          <p className={`mt-4 text-center font-semibold ${msgTextColor}`}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
