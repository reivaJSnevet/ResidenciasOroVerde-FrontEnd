import { Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import Admin from "../pages/administrador/Administrador";
import Users from "../pages/administrador/users/Users";
import Roles from "../pages/administrador/roles/Roles"
import Categories from "../pages/administrador/categories/Categories";
import Properties from "../pages/administrador/properties/Properties";
import Login from "../pages/login/Login";
import PersistLogin from "../components/auth/PersistLogin";
import RequireAuth from "../components/auth/RequireAuth";
import Propiedad from "../pages/propiedades/propiedad/Propiedad";
import BusquedaCliente from "../pages/cliente/BusquedaCliente";
import Home2 from "../pages/home/Home2.jsx"
import ForRent from "../pages/propiedades/category/ForRent.jsx";
import ForSale from "../pages/propiedades/category/ForSale.jsx";
import Register from "../pages/register/Register";

const routes = (
    <>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home2" element={<Home2 />} />

            <Route path="cliente" element={<BusquedaCliente />} />
            <Route path="/forRent" element={<ForRent />} />
            <Route path="/forSale" element={<ForSale />} />
            <Route path="propiedad" element={<Propiedad />} />
            <Route element={<PersistLogin />}>

                <Route element={<RequireAuth allowedRoles={["admin"]} />}>

                    <Route path="/admin" element={<Admin />}>
                        <Route path="usuarios" element={<Users />} />
                        <Route path="roles" element={<Roles />} />
                        <Route path="categorias" element={<Categories />} />
                        <Route path="propiedades" element={<Properties />} />
                        <Route path="propiedad" element={<Propiedad />} />
                    </Route>

                </Route>
            </Route>
        </Route>
    </>
);

export default routes;
