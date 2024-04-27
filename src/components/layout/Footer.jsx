import React from 'react';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import "../../stylesheets/Footer.css"

function Footer() {
  return (
    <>
    <footer className="footer" id='contacto'>
      <div className="footerContent">
        <div>
          <h3>C O N T A C T O</h3>
          <div className="contactInfo">
            <div className="contactItem">
              
              <p> <PhoneCallbackIcon /> +123456789</p>
            </div>
            <div className="contactItem">
              
              <p><AttachEmailIcon /> residenciasoroverde@gmail.com</p>
            </div>
            <div className="contactItem">
             
              <p>  <LocationOnIcon /> Nicoya, Guanacaste</p>
            </div>
          </div>
        </div>
        <div>
        <h3>S O B R E &nbsp;&nbsp; N O S O T R O S</h3>
        </div>
      </div>
    </footer>
     <div className="copyright">
     <p>© 2024. Residencias Oro Verde. Todos los derechos reservados.</p>
   </div>
   </>
   );
 }


export default Footer