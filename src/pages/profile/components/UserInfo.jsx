import { Email, Phone, Person } from '@mui/icons-material';

const UserInfo = ({ user }) => {
  return (
<div className="flex flex-col items-center justify-center w-full p-4 bg-gray-100 md:flex-row md:items-start md:justify-between md:p-8 animate-fade-in">
  <div className="flex items-center justify-center w-full mb-4 md:w-1/3 md:mb-0">
    <img
      src="FemaleAvatar.webp"
      alt="Avatar del Usuario"
      className="transition-transform transform rounded-full shadow-md w-52 h-52 hover:scale-110"
    />
  </div>
  <div className="flex flex-col justify-center w-full p-6 md:w-2/3">
    <h1 className="mb-4 text-4xl font-bold text-center text-gray-800 md:text-left">Perfil del Usuario</h1>
    <div className="flex flex-wrap">
      <div className="flex items-center w-full p-4 m-2 bg-white rounded-md shadow-md md:w-auto hover:bg-gray-50">
        <Person className="mr-2 text-gray-600" />
        <div>
          <label className="font-semibold text-gray-700">Nombre:</label>
          <p className="text-gray-600">{user.name} {user.lastName} {user.lastName2}</p>
        </div>
      </div>
      <div className="flex items-center w-full p-4 m-2 bg-white rounded-md shadow-md md:w-auto hover:bg-gray-50">
        <Email className="mr-2 text-gray-600" />
        <div>
          <label className="font-semibold text-gray-700">Email:</label>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center w-full p-4 m-2 bg-white rounded-md shadow-md md:w-auto hover:bg-gray-50">
        <Phone className="mr-2 text-gray-600" />
        <div>
          <label className="font-semibold text-gray-700">Teléfonos:</label>
          <p className="text-gray-600">{user.phoneNumbers.principal} | {user.phoneNumbers.secundario}</p>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default UserInfo;
