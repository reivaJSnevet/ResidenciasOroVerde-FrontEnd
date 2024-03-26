import useAuthStore from "../../../hooks/auth/useAuth";
import CarouselComponent from "../../../components/carousel/Carousel";

const PropiedadDetalles = ({ propiedad }) => {
  const auth = useAuthStore((state) => state.auth);
  //cosnt auth = {user: false}

  return (
    <div className="flex flex-col bg-black md:flex-row">
      <div className="w-full p-4 md:w-1/2 bg-slate-50">
        <main className="bg-slate-400">
          <section className="mb-4 bg-yellow-200">
            <header className="bg-slate-200">
              <h1 className="mb-4 text-2xl font-bold">
                Detalles de la propiedad
              </h1>
            </header>
            <h2 className="mb-2 text-lg font-semibold">Información general</h2>
            <p>Nombre: {propiedad.nombre}</p>
            <p>Dimensiones: {propiedad.dimensiones}</p>
          </section>
          <section className="bg-green-300 ">
            <h2 className="mb-2 text-lg font-semibold">Características</h2>
            <p>Habitaciones: {propiedad.numHabitaciones}</p>
            <p>Duchas: {propiedad.numducha}</p>
            <p>Garaje: {propiedad.garaje ? "Sí" : "No"}</p>
            {(propiedad.renta && propiedad.precioAlquiler) && (
              <p>Precio de alquiler: {propiedad.precioAlquiler}</p>
            )}
            {(!propiedad.renta || propiedad.precioVenta) && (
              <p>Precio de venta: {propiedad.precioVenta}</p>
            )}

            <article>
              <h3 className="mb-2 text-lg font-semibold">Descripción</h3>
              <p>{propiedad.descripcion}</p>
            </article>
          </section>
          <div className="w-full bg-red-200 md:hidden ">
            <h2 className="mb-2 text-lg font-semibold">Mapa</h2>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
        </main>

        {auth.user && (
          <footer className="mt-auto bg-purple-300 ">
            <h3 className="mb-2 text-lg font-semibold">Contáctanos</h3>
            <p>Correo: correo@dominio.ejemplo</p>
            <p>Teléfono: 11990033</p>
            <p>
              Ubicación: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Atque quas voluptate corporis excepturi.
            </p>
            {propiedad.renta && (
              <div>
                <h3 className="mb-2 text-lg font-semibold">Comentario</h3>
                <textarea
                  className="w-full h-24 p-2 mb-2 bg-white border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Escribe tu comentario"
                ></textarea>
                <button className="w-full p-2 bg-blue-500">Enviar</button>

                <section>
                  <h3 className="mb-2 text-lg font-semibold">Comentarios</h3>
                  <ul>
                    <li>Comentario 1</li>
                    <li>Comentario 2</li>
                    <li>Comentario 3</li>
                  </ul>
                </section>
              </div>
            )}
          </footer>
        )}
      </div>
      <aside className="w-full p-4 bg-red-200 md:w-1/2 ">
        <div className="hidden mb-4 md:block">
          <h2 className="mb-2 text-lg font-semibold">Mapa</h2>
          <CarouselComponent photos={propiedad.fotos.split(",")} />
        </div>
      </aside>
    </div>
  );
};

export default PropiedadDetalles;
