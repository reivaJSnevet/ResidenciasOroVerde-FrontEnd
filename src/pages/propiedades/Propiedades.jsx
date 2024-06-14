import React, { useState, useEffect } from "react";
import api from "../../database/api";
import { Link } from "react-router-dom";
import Filters from "./components/Filters.jsx";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

  const PropertyCard = ({ property }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className=""
      >
        <div className="relative flex flex-col justify-between mb-6 bg-gray-100 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105 hover:shadow-xl w-72 h-[25rem]">
          {/* <a href="#"> */}
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src={property.photos.split(",")[0]}
              alt="Property"
            />
          {/* </a> */}
          <div className="flex-grow px-4 py-3 ">
            {/* <a href="#"> */}
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                {property.name}
              </h5>
            {/* </a> */}
            <p className="mb-3 font-normal text-gray-700">
              {property.forRent
                ? `Precio Alquiler: ${property.rentalPrice}`
                : `Precio Venta: ${property.salePrice}`}{" "}
              dólares
            </p>
          </div>
          <div className="px-4 pb-4">
            <Link
              to={`/propiedad/${property.id}`}
              className="inline-flex items-center w-full px-3 py-2 text-sm font-medium text-center text-white transition-colors duration-300 rounded-lg bg-zinc-500 hover:bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            >
              Más detalles
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div>
      <Filters handleFilter={handleFilterFunction} />
      <div className="container grid grid-cols-1 gap-6 mx-auto mt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Propiedades;
