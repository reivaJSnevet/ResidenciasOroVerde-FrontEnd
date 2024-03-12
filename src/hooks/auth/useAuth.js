import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            auth: {
                user: {},
                accessToken: null,
            },
            persist: false,
            setAuth: (auth) => set(() => ({ auth: auth })),
            setPersist: (persist) => set(() => ({ persist: persist })),
        }),
        { name: "auth-storage" }
    )
);

export default useAuthStore;
