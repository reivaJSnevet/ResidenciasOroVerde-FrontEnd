import HeaderHome2 from "./HeaderHome2";

function Home2() {
  return (
    <>
      <HeaderHome2 />
      <section id="home"
        className="relative flex items-center justify-center w-full h-screen bg-black bg-opacity-20"
      >
        <div>
          <h2 className="text-center text-white">Disfrute de Residencias Oro Verde</h2>
          <p className="text-center text-white">La casa de sus sueños está a un clic</p>
          <div className="flex justify-center mt-4">
          <a 
            href="#" 
            className="inline-block px-12 py-2 text-sm font-medium text-white transition-colors border-white rounded border-3 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black"
          >
             Ver casas 
          </a>
          </div>
        </div>
        <video
          className="object-cover object-center w-full h-full fixed top-0 left-0 z-[-1]"
          autoPlay
          muted
          loop
          src="/video.mp4"
        />
      </section>
    </>
  );
}

export default Home2;
