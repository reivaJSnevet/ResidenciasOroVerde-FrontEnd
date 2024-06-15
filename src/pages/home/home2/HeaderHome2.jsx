import useAuthStore from "../../../hooks/auth/useAuth";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "./logo";


const HeaderHome2 = ({topSales = [], topRents = []}) => {
  const auth = useAuthStore((state) => state.auth);
  const location = useLocation();
  const [showRentCards, setShowRentCards] = useState(false);
  const [showSaleCards, setShowSaleCards] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  



  const navBgClass = showRentCards || showSaleCards ? "bg-white text-black" : "text-white";


  return (
    <header id="header-home2" className={`z-40 flex items-center justify-between w-full px-10 fixed ${navBgClass}`}>
      <div className="flex flex-grow basis-0">
        <Link to="/" className="w-auto">
          <Logo />
        </Link>
      </div>

      <Navbar topRents={topRents} topSales={topSales} showRentCards={showRentCards} showSaleCards={showSaleCards} setShowRentCards={setShowRentCards} setShowSaleCards={setShowSaleCards}/>

      <nav className="flex justify-end flex-grow basis-0">
        <ul className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
        {
                        auth.accessToken ?
                            <Link to="/profile" className="">Perfil</Link> :
                            <Link to="/login" state={{ from: location.pathname }} 
                            className="px-4 py-2 transition duration-500 border-2 border-transparent hover:bg-gray-200 hover:border-white hover:bg-black hover:bg-opacity-20"
                            >Iniciar Sesión</Link>}
          
        </ul>
      </nav>

      <div className="block xl:hidden sm:block">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="absolute right-0 w-48 p-4 mt-2 text-black bg-white rounded-lg shadow-lg top-full xl:hidden sm:block backdrop-blur-lg">
          <ul className="flex flex-col [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/alquiler">Alquiler</Link></li>
            <li><Link to="/venta">Venta</Link></li>
            <li><Link to="/mapa">Mapa</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
};


export default HeaderHome2;
