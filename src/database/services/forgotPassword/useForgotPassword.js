import api from "../../api";

export const postForgotPassword = async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response;
}