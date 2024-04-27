import { useState } from "react";


const Register = () => {
  const [user, setUser] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>

      <div className="py-16">
        <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-4xl">
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl text-center text-gray-700 font-regular">
              Registro
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
                <div className="mb-4">
                  <label
                    className="block mb-2 font-semibold text-gray-700"
                    htmlFor="name"
                  >
                    Nombre
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Ingrese su nombre"
                    autoComplete="off"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    value={user.name}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 font-semibold text-gray-700"
                    htmlFor="apellido"
                  >
                    Apellido
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                    id="apellido"
                    type="text"
                    placeholder="Ingrese su apellido"
                    autoComplete="off"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    value={user.lastName}
                    required
                  />
                </div>
                <label
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                  id="correo"
                  autoComplete="off"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  value={user.email}
                  required
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="phoneNumber"
                >
                  Número de teléfono
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  type="text"
                  placeholder="Ingrese su número de teléfono"
                  autoComplete="off"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  value={user.phoneNumber}
                  required
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
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  value={user.password}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-semibold text-gray-700"
                  htmlFor="password"
                >
                  Confirmar contraseña
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Confirme su contraseña"
                  autoComplete="off"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  value={user.password}
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-900"
                  type="submit"
                >
                  Registrar
                </button>
              </div>

              <div className="mb-6"></div>
              <p className="ml-2 text-sm text-black">
                ¿Ya tienes cuenta?{" "}
                <span className="text-blue-500">
                  <a href="/login">Iniciar Sesión</a>
                </span>
              </p>
            </form>
          </div>
          <div
            className="hidden bg-cover lg:block lg:w-1/2 brightness-50"
            style={{
              backgroundImage:
                "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/402099282.jpg?k=1062818d79cc9e9c82c7be5059e68f4043e0726420b0a39e20b491dbefc34102&o=&hp=1')",
            }}
          ></div>
        </div>
      </div>
  
    </>
  );
};

export default Register;
