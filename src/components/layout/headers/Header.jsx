import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../../hooks/auth/useAuth';
import LogoG from '../../../pages/home/home1/LogoG';
import { GridMenuIcon } from '@mui/x-data-grid';
import { CloseOutlined } from '@mui/icons-material';


function Header() {
    const auth = useAuthStore((state) => state.auth);
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header id="header-home1" className="sticky top-0 z-40 flex items-center justify-between w-full px-4 bg-gray-180 bg-opacity-90 backdrop-blur-sm shadow-md transition-shadow duration-300 ease-in-out">
            <div className="flex flex-grow basis-0">
                <a href="/" className="w-auto">
                    <LogoG />
                </a>
            </div>


            <nav className="hidden xl:flex text-sm">
                <ul className="flex space-x-4">
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/propiedades">Búsqueda</NavLink>
                    <NavLink to="/contactUs">Contacto</NavLink>
                    <NavLink to="/aboutUs">Sobre nosotros</NavLink>
                </ul>
            </nav>

         
            <nav className="flex xl:hidden items-center">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-sm px-4 py-2 border border-transparent rounded-md text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    {showMenu ? <CloseOutlined /> : <GridMenuIcon />} 
                </button>
                {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <ul className="py-1">
                            <MobileNavLink to="/" onClick={() => setShowMenu(false)}>Inicio</MobileNavLink>
                            <MobileNavLink to="/propiedades" onClick={() => setShowMenu(false)}>Búsqueda</MobileNavLink>
                            <MobileNavLink to="/contactUs" onClick={() => setShowMenu(false)}>Contacto</MobileNavLink>
                            <MobileNavLink to="/aboutUs" onClick={() => setShowMenu(false)}>Sobre nosotros</MobileNavLink>
                        </ul>
                    </div>
                )}
            </nav>

            <nav className="flex justify-end flex-grow basis-0">
                <ul className="flex text-sm">
                    {auth.accessToken ? (
                        <li>
                            <Link to="/profile" className="px-4 py-2 transition duration-500 border-b-2 border-transparent hover:border-green-800">Perfil</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" state={{ from: location.pathname }} className="px-4 py-2 transition duration-500 border-b-2 border-transparent hover:border-green-800">Iniciar Sesión</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

function NavLink({ to, children }) {
    return (
        <li>
            <Link
                to={to}
                className="px-4 py-2 transition duration-500 border-b-2 border-transparent hover:border-green-800"
            >
                {children}
            </Link>
        </li>
    );
}

function MobileNavLink({ to, children, onClick }) {
    return (
        <li>
            <Link
                to={to}
                onClick={onClick}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-gray-900"
            >
                {children}
            </Link>
        </li>
    );
}

export default Header;
