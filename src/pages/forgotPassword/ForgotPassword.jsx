const ForgotPassword = () => {
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
            Por favor, introduce tu <strong>correo electrónico</strong> para que podamos enviarte
            un enlace de recuperación.
          </span>
          <div className="relative mt-6">
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
              placeholder="Ingrese su correo electrónico"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="px-4 py-2">
          <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-green-700 rounded hover:bg-green-900">
            Buscar correo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
