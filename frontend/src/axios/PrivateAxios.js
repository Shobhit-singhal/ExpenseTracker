import axios from "axios";

const privateAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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
