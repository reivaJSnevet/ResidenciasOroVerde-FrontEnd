import React from 'react';
import '../stylesheets/Header.css' 
import { Link } from 'react-router-dom';

function Header() {



    return (
      <nav className="header">
        <div> 
        <img src="/zyro-image-removebg-preview.png" alt="Logo de la empresa" className="h-20 w-20 mr-6" />
        <span className="font-semibold text-xl tracking-tight"></span>
        </div>
       

        <div className="links">
        <Link to="/" className="boton1">INICIO</Link>
        <a href="#" className="boton1">SERVICIOS</a>
         <a href="#contacto" className="boton1">CONTACTO</a> 
        <Link to="/login/" className="boton1">INICIAR SESIÓN</Link>
       
      </div>
      </nav>
     
    );
  }
  
  export default Header;
  