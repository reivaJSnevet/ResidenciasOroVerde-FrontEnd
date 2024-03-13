import api from "../../database/api";
import useAuthStore from "./useAuth";

const useLogout = () => {
    const setAuth  = useAuthStore((state) => state.setAuth);

    const logout = async () => {
        try {
            await api.get("/auth/logout", {
                withCredentials: true,
            });

            setAuth({
                user: {},
                accessToken: null,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return logout;
};

export default useLogout;
