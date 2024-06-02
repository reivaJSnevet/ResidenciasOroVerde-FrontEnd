const UserInfo = ({ user }) => {
  return (
    <>
      <div className="flex items-center justify-center w-full mb-4 md:w-1/3 md:mb-0">
        <img
          src="https://via.placeholder.com/250"
          alt="Avatar del Usuario"
          className="rounded-full shadow-md w-52 h-52"
        />
      </div>
      <div className="flex flex-col justify-center w-full p-6 md:w-2/3">
        <h1 className="mb-4 text-2xl">Perfil del Usuario</h1>
        <div className="flex flex-wrap">
          <label className="w-full p-2 m-2 bg-white rounded-md shadow-md md:w-auto">
            Nombre: {user.name} {user.lastName} {user.lastName2}
          </label>
          <label className="w-full p-2 m-2 bg-white rounded-md shadow-md md:w-auto">
            Email: {user.email}
          </label>
          <label className="w-full p-2 m-2 bg-white rounded-md shadow-md md:w-auto">
            Teléfonos: {user.phoneNumbers.principal} |{" "}
            {user.phoneNumbers.secundario}
          </label>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
