import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropiedadDetalles from "./components/PropiedadDetalles";
import api from "../../database/api";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import useAuthStore from "../../hooks/auth/useAuth";
import Map from "./components/map/Map";
import PhotosGallery from "./components/photosGallery/PhotosGallery";
import Comments from "./components/comments/Comments";
import Rating from "./components/rating/Rating";

const Propiedad = () => {
  const auth = useAuthStore((state) => state.auth);
  const { id } = useParams();
  const privateApi = useAxiosPrivate();
  const [refresh, setRefresh] = useState(false);

  const [property, setProperty] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 9.7489,
    lng: -83.7534,
  });

  useEffect(() => {
    const getProperty = async () => {
      //TODO: Deuda tecnica - usar servicio para obtener propiedad
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

  useEffect(() => {
    const getFavs = async () => {
      const { data } = await privateApi.get(
        `/users/${auth.user.id}/favorite-properties`
      );
      data.find((property) => property.id === id)
        ? setIsFavorite(true)
        : setIsFavorite(false);
    };

    getFavs();
  }, [auth.user, id, privateApi]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await privateApi.delete(`/users/${auth.user.id}/favorite-properties/${id}`);
      } else {
        await privateApi.post(`/users/${auth.user.id}/favorite-properties/${id}`);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col p-6 md:flex-row">
        <main className="md:w-1/2 md:pr-6">
          <PropiedadDetalles
            property={property}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            handleFavorite={handleFavorite}
          />
        </main>
        <aside className="md:w-1/2 md:pl-6">
          <section className="mt-8 mb-8">
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              Galería
            </h3>
            <div className="w-full rounded-md shadow-lg h-[450] overflow-hidden border-gray-50 border">
              <PhotosGallery photos={property?.photos} />
            </div>
          </section>
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800">Ubicación</h3>
            <div className="w-full overflow-hidden rounded-md shadow-lg">
              <Map center={coordinates} zoom={14} />
            </div>
          </section>
        </aside>
      </div>
      {property?.forRent && (
        <div className="p-6 rounded-md shadow-lg bg-gray-50">
          <div className="p-4 mb-4">
            <span className="text-lg font-bold md:text-xl lg:text-2xl">
              Calificaciones y comentarios
            </span>
            <div className="flex items-center justify-between mt-4">
              <Rating
                ratings={auth.user.ratings}
                propertyId={id}
                userId={auth.user.id}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </div>
          </div>

          <Comments
            user={auth.user}
            comments={property.Comments}
            propertyId={id}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </div>
      )}
    </>
  );
};

export default Propiedad;
