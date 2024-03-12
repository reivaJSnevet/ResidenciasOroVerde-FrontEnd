import { Route } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from "../pages/home/Home";
import Admin from "../pages/administrador/Administrador";
import UsuariosTable from "../pages/administrador/components/UsuariosTable";
import RolesTable from "../pages/administrador/components/RolesTable";
import CategoriasTable from "../pages/administrador/components/CategoriasTable";
import PropiedadesTable from "../pages/administrador/components/PropiedadTable";

const routes = (
  <>
    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home />} />

      <Route path="/admin" element={<Admin />}>
        <Route path="usuarios" element={<UsuariosTable />} />
        <Route path="roles" element={<RolesTable />}/>
        <Route path="categorias" element={<CategoriasTable />}/>
        <Route path="propiedades" element={<PropiedadesTable />}/>
      </Route>
    </Route>
  </>
);

export default routes;
