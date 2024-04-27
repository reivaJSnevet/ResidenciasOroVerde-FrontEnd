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
    <Grid container direction="column" style={{ minHeight: "100vh" }}>
    <Grid item>
      {auth?.user?.Role?.name === "admin" ? <HeaderAdmin /> : <Header />}
    </Grid>
    <Grid item xs>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Grid>
    <Grid item>
      <Footer />
    </Grid>
  </Grid>
  )
}

export default Layout