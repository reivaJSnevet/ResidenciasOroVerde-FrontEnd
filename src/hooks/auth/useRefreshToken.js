import api from "../../database/api";
import useAuthStore from "./useAuth";

const useRefreshToken = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    const refreshToken = async () => {
        const response = await api.get("/auth/refresh-token", {
            withCredentials: true,
        });

        setAuth({
            user: response.data.usuario,
            accessToken: response.data.tokenAcceso,
        });

        return response.data.tokenAcceso;
    };

    return refreshToken;
};

export default useRefreshToken;
