import axios from "axios";

const privateAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

privateAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

privateAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status == 401) {
            console.log("Not authorized");
        }
        return Promise.reject(error);
    }
);
export default privateAxios;
