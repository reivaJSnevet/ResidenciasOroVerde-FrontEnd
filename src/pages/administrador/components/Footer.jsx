import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

function Footer() {
  return (
  <>
   <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.success.main
            : theme.palette.success.dark,
        p:2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
             Sobre Nosotros
            </Typography>
            <Typography variant="body2" color="white">
              Somos una adnaodjaojdoaijdiaojd aodajdoaj adjaodjajd adolajodj
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
             Contactanos
            </Typography>
            <Typography variant="body2" color="white">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" color="white">
              Email: oroVeerde.com
            </Typography>
            <Typography variant="body2" color="white">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
             Siguenos en nuestras redes!
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook className= "text-white"/>
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram  className= "text-white" />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter  className= "text-white" />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="white" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://oroVerde.com">
             OroVerde
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  </>
  )
}

export default Footer