import UsuariosTable from "./components/UsuariosTable";
import AddUser from "./components/AddUser";
import { useState } from "react";

function Users() {
  const [reset, setReset] = useState(false);

  return (
    <div className="m-10 shadow-lg">
      <div className="mb-2">
        <AddUser reset={reset} setReset={setReset} />
      </div>
      <div className="">
        <UsuariosTable reset={reset} setReset={setReset} />
      </div>
    </div>
  );
}

export default Users;
