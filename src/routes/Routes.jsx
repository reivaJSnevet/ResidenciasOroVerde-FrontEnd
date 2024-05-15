import { Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/home1/Home.jsx";
import Admin from "../pages/administrador/Administrador";
import Users from "../pages/administrador/users/Users";
import Roles from "../pages/administrador/roles/Roles"
import Categories from "../pages/administrador/categories/Categories";
import Properties from "../pages/administrador/properties/Properties";
import Login from "../pages/login/Login";
import PersistLogin from "../components/auth/PersistLogin";
import RequireAuth from "../components/auth/RequireAuth";
import Propiedad from "../pages/propiedades/propiedad/Propiedad";
import Propiedades from "../pages/propiedades/Propiedades.jsx";
import Home2 from "../pages/home/home2/Home2.jsx";
import ForSale from "../pages/propiedades/components/category/ForSale.jsx";
import ForRent from "../pages/propiedades/components/category/ForRent.jsx";
import Register from "../pages/register/Register";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "../pages/resetPassword/ResetPassword.jsx";
import Unauthorized from "../pages/unauthorized/Unauthorized.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";
import SaleProperty from "../pages/administrador/saleProperties/SaleProperty.jsx";
import RentalProperty from "../pages/administrador/rentalProperties/RentalProperty.jsx";


const routes = (
    <>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="/home2" element={<Home2 />} />

        <Route path="reset-password" element={<ResetPassword />} />

        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            

            <Route path="/propiedades" element={<Propiedades />} />
            <Route path="/forRent" element={<ForRent />} />
            <Route path="/forSale" element={<ForSale />} />
            <Route path="/propiedad" element={<Propiedad />}>
                <Route path=":id" element={<Propiedad />} />
            </Route>
            <Route element={<PersistLogin />}>

                <Route element={<RequireAuth allowedRoles={["admin"]} />}>

                    <Route path="/admin" element={<Admin />}>
                        <Route path="usuarios" element={<Users />} />
                        <Route path="roles" element={<Roles />} />
                        <Route path="categorias" element={<Categories />} />
                        <Route path="propiedades" element={<Properties />} />
                        <Route path="propiedad" element={<Propiedad />} />
                        <Route path="propiedadesVenta" element={<SaleProperty />} />
                        <Route path="propiedadesAlquiler" element={<RentalProperty />} />
                    </Route>

                </Route>
            </Route>
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
    </>
);

export default routes;
