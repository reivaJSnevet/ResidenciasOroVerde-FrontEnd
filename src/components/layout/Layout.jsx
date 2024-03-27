import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Grid container direction="column" style={{ minHeight: "100vh" }}>
    <Grid item>
      <Header />
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