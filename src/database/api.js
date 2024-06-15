import axios from "axios";
const URL = "https://residenciasoroverde-backend-production.up.railway.app/api/";


export default axios.create({
    baseURL: URL
});

export const apiPrivate = axios.create({
    baseURL: URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
});
