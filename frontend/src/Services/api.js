import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});


// 🔥 REQUEST INTERCEPTOR
// Adds token automatically to every request
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


// 🔥 RESPONSE INTERCEPTOR
// Handles expired/invalid token globally
api.interceptors.response.use(

    (response) => response,

    (error) => {

        // 🔥 ONLY auth errors
        if (
            error.response &&
            (
                error.response.status === 401 ||
                error.response.status === 403
            )
        ) {

            localStorage.removeItem("token");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;