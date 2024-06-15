import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../../hooks/auth/useAuth';
import Logo from '../../../pages/home/home2/logo';

function Header() {
    const auth = useAuthStore((state) => state.auth);
    const location = useLocation();

    return (
        <header id="header-home1" className="sticky z-40 flex items-center justify-between w-full px-10 text-black ">
            <div className="flex flex-grow basis-0">
                <a href="" className="w-auto">
                    <Logo />
                </a>
            </div>

            <nav className="relative hidden xl:block sm:hidden">
                <ul className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
                    <li><Link
                     className="px-4 py-2 transition duration-500 border-2 border-transparent hover:bg-gray-200 hover:border-white hover:bg-black hover:bg-opacity-20"
                      to="/">Inicio</Link></li>

                    <li className="relative">
                        <Link
                         className="px-4 py-2 transition duration-500 border-2 border-transparent hover:bg-gray-200 hover:border-white hover:bg-black hover:bg-opacity-20" 
                         to="/propiedades" >Búsqueda</Link>
                        
                        <Link 
                         className="px-4 py-2 transition duration-500 border-2 border-transparent hover:bg-gray-200 hover:border-white hover:bg-black hover:bg-opacity-20"
                        to="/contactUs">Contacto</Link>

                        <Link 
                         className="px-4 py-2 transition duration-500 border-2 border-transparent hover:bg-gray-200 hover:border-white hover:bg-black hover:bg-opacity-20"
                        to="/aboutUs">Sobre nosotros</Link>
                    </li>
                </ul>
            </nav>

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
        </header>
   
    );
}

export default Header;


