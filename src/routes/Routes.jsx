import { Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import Admin from "../pages/administrador/Administrador";
import UsuariosTable from "../pages/administrador/users/UsuariosTable";
import Roles from "../pages/administrador/roles/Roles"
import CategoriasTable from "../pages/administrador/categories/CategoriasTable";
import PropiedadesTable from "../pages/administrador/properties/PropiedadTable";
import Login from "../pages/login/Login";
import PersistLogin from "../components/auth/PersistLogin";
import RequireAuth from "../components/auth/RequireAuth";
import Propiedades from "../pages/propiedades/Propiedades";
import BusquedaCliente from "../pages/cliente/BusquedaCliente";
import Home2 from "../pages/home/Home2";
import ForRent from "../pages/propiedades/components/category/ForRent";
import ForSale from "../pages/propiedades/components/category/ForSale";

const routes = (
    <>

     <Route path="/" element={<Home/>} /> 
     <Route path="/home2" element={<Home2 />} /> 
            <Route path="login" element={<Login />} />
            <Route path="cliente" element={<BusquedaCliente />} /> 
            <Route path="/forRent" element={<ForRent/>} />
            <Route path="/forSale" element={<ForSale/>} />
            <Route path="propiedades" element={<Propiedades />} /> 
            <Route element={<PersistLogin />}>
               
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                <Route path="/" element={<Layout/>}>
                    <Route path="/admin" element={<Admin />}>
                        <Route path="usuarios" element={<UsuariosTable />} />
                        <Route path="roles" element={<Roles />} />
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
