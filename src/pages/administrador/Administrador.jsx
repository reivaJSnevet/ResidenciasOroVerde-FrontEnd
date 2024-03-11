import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function Administrador() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Administrador;
