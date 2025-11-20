import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // backend base URL
    withCredentials: true,                // allow cookies/tokens
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
