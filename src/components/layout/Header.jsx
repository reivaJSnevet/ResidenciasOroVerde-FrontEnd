import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import {Menu} from "@mui/icons-material";

function Header() {
  const ListOptions = () => {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="">
            <ListItemText primary={"Casas de Alquiler"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="">
            <ListItemText primary={"Casas de Venta"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="admin/usuarios">
            <ListItemText primary={"Usuarios"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="">
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
      <AppBar position="sticky" sx={{ backgroundColor: "#5c7e03" }}>
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
          <Avatar src="/zyro-image.png" sx={{ width: 56, height: 56 }}></Avatar>
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
