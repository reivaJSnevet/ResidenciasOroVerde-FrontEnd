import { create } from "zustand";

const useAuthStore = create(
        (set) => ({
            auth: {
                user: {},
                accessToken: null,
            },
            persist: localStorage.getItem("persist") === "true" ? true : false,
            setAuth: (auth) => set(() => ({ auth: auth })),
            setPersist: (persist) => set(() => ({ persist: persist })),
        })
);

export default useAuthStore;
