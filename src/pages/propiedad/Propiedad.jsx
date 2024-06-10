import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropiedadDetalles from "./components/PropiedadDetalles";
import api from "../../database/api";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import useAuthStore from "../../hooks/auth/useAuth";
import Map from "./components/map/Map";
import PhotosGallery from "./components/photosGallery/PhotosGallery";
import Comments from "./components/comments/Comments";

const Propiedad = () => {
  const auth = useAuthStore((state) => state.auth);
  const { id } = useParams();
  const privateApi = useAxiosPrivate();
    const [refresh, setRefresh] = useState(false);

  const [property, setProperty] = useState({});
  const [coordinates, setCoordinates] = useState({
    lat: 9.7489,
    lng: -83.7534,
  });

  useEffect(() => {
    const getProperty = async () => { //TODO: Deuda tecnica - usar servicio para obtener propiedad
      try {
        if (auth.accessToken) {
          const { data } = await privateApi.get(`/properties/${id}`);
          setProperty(data);
        } else {
          const { data } = await api.get(`/properties/${id}`);
          setProperty(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getProperty();
  }, [id, privateApi, auth, refresh]);

  useEffect(() => {
    if (property?.coordinates) {
      setCoordinates({
        lat: property.coordinates.coordinates[0],
        lng: property.coordinates.coordinates[1],
      });
    }
  }, [property]);

  return (
    <>
      <div className="flex flex-col p-6 md:flex-row">
        <main className="md:w-1/2 md:pr-6">
          <PropiedadDetalles property={property}/>
        </main>
        <aside className="md:w-1/2 md:pl-6">
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Galería
            </h3>
            <div className="w-full rounded-md shadow-lg h-[450] overflow-hidden">
              <PhotosGallery photos={property?.photos} />
            </div>
          </section>
          <section className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Ubicación
            </h3>
            <div className="w-full overflow-hidden rounded-md shadow-lg">
              <Map center={coordinates} zoom={14} />
            </div>
          </section>
        </aside>
      </div>
        { property?.forRent
            && <Comments user={auth.user} comments={property.Comments} propertyId={id} refresh={refresh} setRefresh={setRefresh} /> 
        }
    </>
  );
};

export default Propiedad;