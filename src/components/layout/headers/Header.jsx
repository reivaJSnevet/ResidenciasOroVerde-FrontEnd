import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../../hooks/auth/useAuth';

function Header() {
    const auth = useAuthStore((state) => state.auth);
    const location = useLocation();

    return (
        <nav className="flex items-center justify-between bg-[#3c6c42] p-4 shadow-lg">
            <div className="flex items-center flex-shrink-0 text-white">
                <img className="w-12 h-12" src="/zyro-image-removebg-preview.png" alt="Logo"></img>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-[#c6c9c3] border-[#3c6c42] transition-all duration-500 ease-in-out hover:bg-[#61dd67] hover:text-white">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">INICIO</Link>
                    <Link to="/propiedades" className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">BÚSQUEDA</Link>
                    <Link to="/contactUs" className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">CONTACTO</Link>
                    <Link to="/aboutUs" className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">SOBRE NOSOTROS</Link>
                    {
                        auth.accessToken ?
                        <Link to="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">PERFIL</Link> :
                        <Link to="/login" state={{from: location.pathname}} className="block mt-4 lg:inline-block lg:mt-0 text-[#c6c9c3] hover:text-white hover:bg-[#61dd67] rounded-md px-4 py-2 transition-all duration-500 ease-in-out mr-4">INICIAR SESIÓN</Link>}
                </div>
            </div>
        </nav>
    );
}

export default Header;
