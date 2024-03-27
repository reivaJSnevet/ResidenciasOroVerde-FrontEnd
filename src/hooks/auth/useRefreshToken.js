import api from "../../database/api";
import useAuthStore from "./useAuth";

const useRefreshToken = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    const refreshToken = async () => {
        const response = await api.get("/auth/refresh-token", {
            withCredentials: true,
        });

        console.log("\x1b[32m%s\x1b[0m", "---------");

        setAuth({
            user: response.data.user,
            accessToken: response.data.accessToken,
        });

        return response.data.accessToken;
    };

    return refreshToken;
};

export default useRefreshToken;
