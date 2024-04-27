import React from 'react';
import '../stylesheets/Header.css' 
import { Link } from 'react-router-dom';

function Header() {



    return (
      <nav className="header" >
        <div> 
        <img src="/zyro-image-removebg-preview.png" alt="Logo de la empresa" className="w-20 h-20 mr-6" />
        <span className="text-xl font-semibold tracking-tight"></span>
        </div>
       

        <div className="links">
        <Link to="/" className="boton1">INICIO</Link>
        <div className="dropdown">
        <button className="boton1">SERVICIOS</button>
        <div className="dropdown-content">
          <Link to="/forRent" className="boton1 sub-option">ALQUILER</Link>
          <Link to="/forSale" className="boton1 sub-option">VENTA</Link>
        </div>
      </div>
         <a href="#contacto" className="boton1">CONTACTO</a> 
         <Link to="/cliente" className="boton1">BÚSQUEDA</Link>
        <Link to="/login/" className="boton1">INICIAR SESIÓN</Link>
       
      </div>
      </nav>
     
    );
  }
  
  export default Header;
  