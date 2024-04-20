import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Menu, ExitToApp } from "@mui/icons-material";
import useLogout from "../../hooks/auth/useLogout";

function Header() {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate("/login");
    };


  const ListOptions = () => {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="" disabled={true}>
            <ListItemText primary={"Casas de Alquiler"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="" disabled={true}>
            <ListItemText primary={"Casas de Venta"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="admin/usuarios">
            <ListItemText primary={"Usuarios"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="" disabled={true}>
            <ListItemText primary={"Ranking"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="admin/roles">
            <ListItemText primary={"Roles"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="admin/categorias">
            <ListItemText primary={"Categorias"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="admin/propiedades">
            <ListItemText primary={"Propiedades"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={signOut}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
          <ListItemText className="text-red-600" primary={"Cerrar Sesión"} />
            </ListItemButton>
        </ListItem>
      </>
    );
  };

  const [open, setOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#3c6c42" }}>
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ m: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Administrador
            </Typography>
          </div>
          <Avatar src="/zyro-image-removebg-preview.png" sx={{ width: 70, height: 70 }}></Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <div className="flex items-center justify-center p-1" id="DrawerHead">
          <IconButton onClick={handleDrawerClose}>
            <Avatar
              src="/zyro-image.png"
              alt="Image"
              style={{ width: "100px", height: "auto" }}
            />
          </IconButton>
        </div>
        <List>
          <ListOptions />
        </List>
      </Drawer>
    </>
  );
}

export default Header;
