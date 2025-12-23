/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // --- FIX IS HERE ---
        // Check if the request is NOT for login or register before trying to refresh.
        // If the error comes from /login, we want to let the LoginPage handle it (show "Wrong Password")
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/login") &&
            !originalRequest.url?.includes("/signup")
        ) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(api(originalRequest));
                        },
                        reject: (err: any) => {
                            reject(err);
                        },
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                const res = await axios.post("http://localhost:5000/api/auth/refresh-token", { refreshToken });

                const { accessToken } = res.data;

                localStorage.setItem("accessToken", accessToken);
                api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                processQueue(null, accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);

                // Only redirect if we are NOT already on the login page to avoid loops
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;