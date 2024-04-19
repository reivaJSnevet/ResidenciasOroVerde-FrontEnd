import React from 'react';
import { useState } from 'react';

const BarraBusqueda = () => {
 
    const [filtro, setFiltro] = useState('');

    const handleChange = (e) => {
        setFiltro(e.target.value);
    };
    
    return (
        <form className="max-w-md mx-auto ">
          <label htmlFor="default-search" className="sr-only">Buscar</label>
          <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm rounded-lg border border-gray-400" placeholder="Buscar"  value={filtro} onChange={handleChange} required />
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-400 shadow">
            Buscar
            </button>
          </div>
        </form>
      );
    }

export default BarraBusqueda;
