import CategoriasTable from "./components/CategoriasTable";
import AddCategory from "./components/AddCategory";
import { useState } from "react";

function Categories() {
  const [reset, setReset] = useState(false);
//aqui se mandan a hacer los get por props a los componentes
  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddCategory reset={reset} setReset={setReset} />
        </div>
        <div className="">
            <CategoriasTable reset={reset} setReset={setReset} />
        </div>
      </div>
    </>
  );
}

export default Categories;
