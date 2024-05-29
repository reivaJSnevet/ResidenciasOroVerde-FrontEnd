import { Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/home1/Home.jsx";
import Admin from "../pages/administrador/Administrador";
import Users from "../pages/administrador/users/Users";
import Roles from "../pages/administrador/roles/Roles";
import Categories from "../pages/administrador/categories/Categories";
import Properties from "../pages/administrador/properties/Properties";
import Login from "../pages/login/Login";
import PersistLogin from "../components/auth/PersistLogin";
import RequireAuth from "../components/auth/RequireAuth";
import Propiedad from "../pages/propiedad/Propiedad.jsx";
import Propiedades from "../pages/propiedades/Propiedades.jsx";
import Home2 from "../pages/home/home2/Home2.jsx";
import ForSale from "../pages/propiedades/components/category/ForSale.jsx";
import ForRent from "../pages/propiedades/components/category/ForRent.jsx";
import Register from "../pages/register/Register";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "../pages/resetPassword/ResetPassword.jsx";
import Unauthorized from "../pages/unauthorized/Unauthorized.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";
import AboutUs from "../pages/aboutUs/AboutUs.jsx";
import Profile from "../pages/profile/Profile.jsx";

const routes = (
  <>
    <Route element={<PersistLogin />}>
      <Route path="/" element={<Home2 />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password" element={<ResetPassword />}>
        <Route path=":token" element={<ResetPassword />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/mapa" element={<Home />} />
        <Route path="/propiedades" element={<Propiedades />} />

        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/propiedad" element={<Propiedad />}>
            <Route path=":id" element={<Propiedad />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Route>

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

      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />

    </Route>
  </>
);

export default routes;
