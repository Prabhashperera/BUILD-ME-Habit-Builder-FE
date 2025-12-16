import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // backend base URL
    withCredentials: true,                // allow cookies/tokens
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 403 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            const res = await axios.post("/refresh-token", {
                refreshToken: localStorage.getItem("refreshToken")
            })

            localStorage.setItem("accessToken", res.data.accessToken)

            originalRequest.headers.Authorization =
                `Bearer ${res.data.accessToken}`

            return api(originalRequest)
        }

        return Promise.reject(error)
    }
)

export default api;
