import React from "react";
import HeaderHome2 from "./HeaderHome2";

function Home2() {
  return (
    
    <>
    
    <HeaderHome2/>
    <section id="home">
      {/* <h2 className="text-center text-white">Disfrute de Residencias Oro Verde</h2>
      <p className="text-center text-white">Programe una cita para ver casas</p> */}
      {/* <div className="flex justify-center mt-4"> */}
        {/* <a
          href="#"
          className="inline-block px-12 py-2 text-sm font-medium text-white transition-colors border-white rounded border-3 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black"
        >
          Prueba de casas
        </a>
      </div> */}
      <video
        className="object-cover object-center w-full h-full mt-4"
         autoPlay
         muted
         loop
         src="/video.mp4"
      />
    </section>
    </>
  );
}

export default Home2;
