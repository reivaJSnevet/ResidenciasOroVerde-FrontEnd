import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderHome2 from "./HeaderHome2";
import api from "../../../database/api";
import { categorizeBySaleRent } from "./services/categorizeProperties";
import { sortByPrice, sortByRating } from "./services/sortProperties";

function Home2() {
  const [topRentals, setTopRentals] = useState([]);
  const [topSales, setTopSales] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/properties");
        const { sale, rent } = categorizeBySaleRent(response.data);
        console.log(sale, rent);
        setTopRentals(sortByRating(rent).slice(0, 3));
        setTopSales(sortByPrice(sale).slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <>
      <HeaderHome2 topRents={topRentals} topSales={topSales} />
      <section
        id="home"
        className="relative flex items-center justify-center w-full h-screen bg-black bg-opacity-20"
      >
        <div>
          <h2 className="text-center text-white">
            Disfrute de Residencias Oro Verde
          </h2>
          <p className="text-center text-white">
            La casa de sus sueños está a un clic
          </p>
          <div className="flex justify-center mt-4">
            <Link
              to="/propiedades"
              className="inline-block px-12 py-2 text-sm font-medium text-white transition-colors border-white rounded border-3 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black"
            >
              Ver casas
            </Link>
          </div>
        </div>
        <video
          className="object-cover object-center w-full h-full fixed top-0 left-0 z-[-1]"
          autoPlay
          muted
          loop
          src="/video.webm"
        />
      </section>
    </>
  );
}

export default Home2;
