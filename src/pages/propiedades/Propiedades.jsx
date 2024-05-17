import React, { useState, useEffect } from 'react';
import api from '../../database/api';
import { Link } from 'react-router-dom';
import Filters from './components/Filters.jsx';


const Propiedades = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);


    useEffect(() => {
        const getPropiedades = async () => {
            try {
                const response = await api.get("/properties");
                const data = response.data;
                setFilteredProperties(data); 
            } catch (error) {
                console.error(error);
            }
        };

        getPropiedades();
    }, []);

    
    const handleFilterFunction = (filteredProperties) => {
        setFilteredProperties(filteredProperties);
    };

    return (
        <div>
             <Filters handleFilter={handleFilterFunction} />
            <div className="container mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-3">
               {filteredProperties.map(property => (
                    <div key={property.id} className="max-w-xs lg:max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                        <a href="#">
                            <img className="rounded-t-lg w-full h-64 object-cover" src={property.photos.split(',')[0]} alt="Property" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{property.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700">{property.forRent ? `Precio Alquiler: ${property.rentalPrice}` : `Precio Venta: ${property.salePrice}`} dólares</p>
                            <Link to="/propiedad" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-zinc-500 rounded-lg hover:bg-zinc-600  focus:ring-4 focus:outline-none focus:ring-gray-300">
                                Más detalles
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Propiedades;