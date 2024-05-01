import api from "../../api";

export const postRegister = async (user) => {
    const response = await api.post("/auth/register", user);
    return response;
};
