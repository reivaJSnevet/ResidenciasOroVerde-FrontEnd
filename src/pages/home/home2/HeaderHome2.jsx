import  { useRef, useEffect } from 'react';
import Logo from './logo'; // Assuming Logo.js is in the same directory

const HeaderHome2 = () => {


  return (
    
    <header id="header-home2" className="fixed z-40 flex items-center justify-between w-full px-10 text-black ">
      <div className="flex flex-grow basis-0">
        <a href="" className="w-auto "><Logo /></a>
      </div>

      <nav className="hidden xl:block sm:hidden">
        <ul className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
          <li><a href="#home">Inicio</a></li>
          <li><a href="#model-3">Alquiler</a></li>
          <li><a href="#model-x">Venta</a></li>
          <li><a href="#model-y">Búsqueda</a></li>
        </ul>
      </nav>

      <nav className="flex justify-end flex-grow basis-0">
        <ul className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
          {/* Add your navigation links here */}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderHome2;
