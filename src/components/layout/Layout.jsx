import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "./headers/Header";
import HeaderAdmin from "./headers/HeaderAdmin";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import useAuthStore from "../../hooks/auth/useAuth";

function Layout() {
  const auth = useAuthStore((state) => state.auth);

  return (
    <div className="flex flex-col">
      <div>
        {auth?.user?.Role?.name === "admin" ? <HeaderAdmin /> : <Header />}
      </div>

      <div className="flex-grow">
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
