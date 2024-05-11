import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropiedadDetalles from "./components/PropiedadDetalles";
import api from "../../../database/api";
import useAxiosPrivate from "../../../hooks/auth/useAxiosPrivate";
import useAuthStore from "../../../hooks/auth/useAuth";

const Propiedad = () => {
  const auth = useAuthStore((state) => state.auth);
  const { id } = useParams();
  const privateApi = useAxiosPrivate();

  const [property, setProperty] = useState({});

  useEffect(() => {
    const getProperty = async () => {
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
  }, [id, privateApi, auth]);

  return (
    <div id="propiedades">
      <PropiedadDetalles property={property} auth={auth} />
    </div>
  );
};

export default Propiedad;
