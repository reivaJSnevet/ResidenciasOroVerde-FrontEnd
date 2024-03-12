import { create } from "zustand";

const useAuthStore = create(
        (set) => ({
            auth: {
                user: {},
                accessToken: null,
            },
            persist: JSON.parse(localStorage.getItem("persist")) || false,
            setAuth: (auth) => set(() => ({ auth: auth })),
            setPersist: (persist) => set(() => ({ persist: persist })),
        })
);

export default useAuthStore;
