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
import Propiedades from "../pages/propiedades/Propiedades";

const routes = (
    <>

     <Route path="/" element={<Home />} /> 
        
            <Route path="login" element={<Login />} />
            <Route element={<PersistLogin />}>
                 {/* <Route path="/home" element={<Home />} />  */}

                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                <Route path="/" element={<Layout/>}>
                    <Route path="/admin" element={<Admin />}>
                        <Route path="usuarios" element={<Users />} />
                        <Route path="roles" element={<Roles />} />
                        <Route path="categorias" element={<Categories />}/>
                        <Route path="propiedades" element={<Properties />}/>
                        <Route path="propiedad" element={<Propiedades/>} />
                    </Route>
                </Route>
            </Route>
        </Route>
    </>
);

export default routes;
