import { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgTextColor, setMsgTextColor] = useState("text-green-800");
  const [msg, setMsg] = useState("");

  const comparePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        console.log("Las contraseñas no coinciden");
      throw new Error("Las contraseñas no coinciden");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      comparePasswords(password, confirmPassword);
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
    <div className="flex items-center justify-center h-screen bg-slate-50 ">
      <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-4xl">
        <img
          className="hidden object-cover lg:block lg:w-1/2 brightness-50"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
          alt="casa olvidada"
        />
        <div className="w-full p-10 lg:w-1/2 bg-gradient-to-br from-green-50 to-green-200">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Reiniciar contraseña
          </h2>
          <p className="block sm:inline">
            Por favor, introduce tu nueva contraseña.
          </p>
          <form className="relative mt-6" onSubmit={handleSubmit}>
            <label className="block mb-2 font-semibold text-gray-700">
              Nueva contraseña
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Ingrese su nueva contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label className="block mb-2 font-semibold text-gray-700">
              Confirmar contraseña
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Confirme su nueva contraseña"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-green-800 rounded hover:bg-green-900">
              Reiniciar contraseña
            </button>
          </form>
            {msg && (
                <p className={`flex items-center justify-center mt-10 text-center font-semibold ${msgTextColor}`}>{msg}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
