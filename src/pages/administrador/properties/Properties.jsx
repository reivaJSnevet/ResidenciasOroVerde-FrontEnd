import PropiedadTable from "./components/PropiedadTable";
import AddProperty from "./components/AddProperty";
import { useState } from "react";

function Properties() {
    const [reset, setReset] = useState(false);
    
  return (
    <div className="m-10 shadow-lg">
    <div className="mb-2">
      <AddProperty reset={reset} setReset={setReset} />
    </div>
    <div className="">
        <PropiedadTable reset={reset} setReset={setReset} />
    </div>
  </div>
  )
}

export default Properties