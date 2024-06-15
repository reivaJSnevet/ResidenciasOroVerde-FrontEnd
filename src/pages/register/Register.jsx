import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { postRegister } from "../../database/services/register/useRegister";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: "/" };

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    lastName2: "",
    email: "",
    phoneNumbers: { principal: "" },
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    if (e.target.id === "phoneNumber") {
      setUser({
        ...user,
        phoneNumbers: { principal: e.target.value },
      });
      return;
    }

    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const comparePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setErrors([
        ...errors,
        { message: "Las contraseñas no coinciden", field: "confirm-password" },
      ]);
      throw new Error("Las contraseñas no coinciden");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      comparePasswords(user.password, confirmPassword);

      const response = await postRegister(user);
      setErrorMsg("");
      response.status === 201 && navigate(from, { replace: true });
    } catch (error) {
      if (error?.response?.data?.validations) {
        setErrors(error.response.data.validations);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-4xl">
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="mb-4 text-2xl text-center text-gray-700 font-regular">
              Registro
            </h2>

            <div className="mt-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  {errorMsg && (
                    <p
                      className="p-3 my-4 text-white bg-red-500 rounded-md errmsg"
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
                      className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Ingrese su nombre"
                      autoComplete="off"
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      value={user.name}
                    />
                    {errors.find((error) => error.field === "name") && (
                      <p className="text-sm text-red-500">
                        {errors.find((error) => error.field === "name").message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 mb-4">
                    <div className="flex flex-col mr-4">
                      <label
                        className="block mb-2 font-semibold text-gray-700"
                        htmlFor="lastName"
                      >
                        Apellido
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Ingrese su apellido"
                        autoComplete="off"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={user.lastName}
                      />

                      {errors.find((error) => error.field === "lastName") && (
                        <p className="text-sm text-red-500">
                          {
                            errors.find((error) => error.field === "lastName")
                              .message
                          }
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block mb-2 font-semibold text-gray-700"
                        htmlFor="lastName2"
                      >
                        Segundo Apellido
                      </label>
                      <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                        id="lastName2"
                        type="text"
                        placeholder="Ingrese su segundo apellido"
                        autoComplete="off"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={user.lastName2}
                      />
                      {errors.find((error) => error.field === "lastName2") && (
                        <p className="text-sm text-red-500">
                          {
                            errors.find((error) => error.field === "lastName2")
                              .message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                  <label
                    className="block mb-2 font-semibold text-gray-700"
                    htmlFor="email"
                  >
                    Correo electrónico
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    value={user.email}
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                  />
                  {errors.find((error) => error.field === "email") && (
                    <p className="text-sm text-red-500">
                      {errors.find((error) => error.field === "email").message}
                    </p>
                  )}
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
                    value={user.phoneNumbers.principal}
                  />
                  {errors.find((error) => error.field === "phoneNumbers") && (
                    <p className="text-sm text-red-500">
                      {
                        errors.find((error) => error.field === "phoneNumbers")
                          .message
                      }
                    </p>
                  )}
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
                  />
                  {errors.find((error) => error.field === "password") && (
                    <p className="text-sm text-red-500">
                      {
                        errors.find((error) => error.field === "password")
                          .message
                      }
                    </p>
                  )}
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
                    id="confirm-password"
                    type="password"
                    placeholder="Confirme su contraseña"
                    autoComplete="off"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    value={confirmPassword}
                  />
                  {errors.find(
                    (error) => error.field === "confirm-password"
                  ) && (
                    <p className="text-sm text-red-500">
                      {
                        errors.find(
                          (error) => error.field === "confirm-password"
                        ).message
                      }
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-900"
                    type="submit"
                  >
                    Registrar
                  </button>
                </div>
              </form>
              <Link to="/login" className="text-sm text-black">
                ¿Ya tienes cuenta?{" "}
                <span className="text-blue-500">Iniciar sesión</span>
              </Link>
            </div>
          </div>
          <img
            className="hidden object-cover w-1/2 bg-cover lg:block brightness-50"
            src="https://s42814.pcdn.co/wp-content/uploads/2019/12/iStock_172413371-1-scaled-1.jpg.webp"
            alt="home under construction"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
