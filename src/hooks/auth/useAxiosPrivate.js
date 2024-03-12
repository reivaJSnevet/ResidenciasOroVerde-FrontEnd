import { apiPrivate } from "../../database/api";
import {useEffect} from "react";
import useAuthStore from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refreshToken = useRefreshToken();
    const auth = useAuthStore((state) => state.auth);
    const setAuth = useAuthStore((state) => state.setAuth);

    useEffect(()=>{
        const requestIntercept = apiPrivate.interceptors.request.use(
            (config) => {
                if(!config.headers["Authorization"]){
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => {
                Promise.reject(error);
            }
        );

        const responseIntercept = apiPrivate.interceptors.response.use(
            (response) => {
                response;
            },
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status == 401 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refreshToken();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return apiPrivate(prevRequest);
                }
                if(error?.response?.status == 401){
                    setAuth({user: null, accessToken: null});
                }

                return Promise.reject(error);
            }
        );
        return () => {
            apiPrivate.interceptors.request.eject(requestIntercept);
            apiPrivate.interceptors.response.eject(responseIntercept);
        };
        
    }, [auth, refreshToken]);

    return apiPrivate;
};

export default useAxiosPrivate;