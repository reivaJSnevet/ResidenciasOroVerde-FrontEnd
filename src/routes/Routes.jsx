import { Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import Admin from "../pages/administrador/Administrador";
import UsuariosTable from "../pages/administrador/components/UsuariosTable";
import RolesTable from "../pages/administrador/components/RolesTable";
import CategoriasTable from "../pages/administrador/components/CategoriasTable";
import PropiedadesTable from "../pages/administrador/components/PropiedadTable";
import Login from "../pages/login/Login";
import PersistLogin from "../components/auth/PersistLogin";
import RequireAuth from "../components/auth/RequireAuth";
import Propiedades from "../pages/propiedades/Propiedades";

const routes = (
    <>

     <Route path="/" element={<Home />} /> 
        <Route path="/" element={<Layout/>}>
            <Route path="login" element={<Login />} />
            <Route element={<PersistLogin />}>
                 {/* <Route path="/home" element={<Home />} />  */}

                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<Admin />}>
                        <Route path="usuarios" element={<UsuariosTable />} />
                        <Route path="roles" element={<RolesTable />} />
                        <Route path="categorias" element={<CategoriasTable />}/>
                        <Route path="propiedades" element={<PropiedadesTable />}/>
                        <Route path="propiedad" element={<Propiedades/>} />
                    </Route>
                </Route>
            </Route>
        </Route>
    </>
);

export default routes;
