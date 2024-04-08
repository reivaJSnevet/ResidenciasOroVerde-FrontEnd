import React, { useState, useEffect } from 'react';
import api from '../../database/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BarraBusqueda from './components/BarraBusqueda.jsx';

function BusquedaCliente() {
    const [propiedades, setPropiedades] = useState([]);

    useEffect(() => {
        const getPropiedades = async () => {
          try {
            const response = await api.get("/properties");
            setPropiedades(response.data);
    
          } catch (error) {
            console.error(error);
          }
        };
    
        getPropiedades();
      }, []);
   
  
    return (
        <div>
        <Header/>
      <div className="container">
      <BarraBusqueda />
      <div className="mt-12"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {propiedades.map(property => (
          <div key={property.id} className="max-w-xs lg:max-w-sm bg-white border border-gray-200 rounded-lg shadow w-80">
            <a href="#">
            < img className="rounded-t-lg w-80 h-64" src={property.photos.split(',')[0]} alt="Property" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{property.name}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700">{property.forRent ? `Precio Renta: ${property.rentalPrice}` : `Precio Alquiler: ${property.salePrice}`} dólares</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
     <Footer/>
    </div>
    );
  };

export default BusquedaCliente;