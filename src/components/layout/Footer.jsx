import React from 'react';
import { PhoneCallback, LocationOn, AttachEmail } from '@mui/icons-material';

function Footer() {
  return (
    <footer className="bg-[#3c6c43] p-4 font-[sans-serif]" id='contacto'>
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between">
        <div className="lg:mr-4 mb-4 lg:mb-0">
          <a >
            <img src="/residenciasLogo.png" alt="logo" className="w-64" />
          </a>
        </div>
        <div className="mb-4 lg:mb-0">
          <h4 className="text-lg font-semibold mb-4 text-white">CONTÁCTANOS</h4>
          <ul className="space-y-2">
            <li>
              <a  className="text-gray-300 hover:text-white text-sm">
                <AttachEmail/> residenciasoroverde@gmail.com
              </a>
            </li>
            <li>
              <a  className="text-gray-300 hover:text-white text-sm">
                <PhoneCallback/> +123456789
              </a>
            </li>
            <li>
              <a  className="text-gray-300 hover:text-white text-sm">
                <LocationOn/> Nicoya, Guanacaste.
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 mr-20 text-white">SOBRE NOSOTROS</h4>
          <ul className="space-y-2">
            <li>
              <a  className="text-gray-300 hover:text-white text-sm">About Us</a>
            </li>
            <li>
              <a className="text-gray-300 hover:text-white text-sm">Terms &amp; Conditions</a>
            </li>
            <li>
              <a className="text-gray-300 hover:text-white text-sm">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="  text-gray-300 text-xs mt-4 text-center">© 2024 <a href='/'  className="hover:underline mx-1">Residencias Oro Verde.</a> Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
