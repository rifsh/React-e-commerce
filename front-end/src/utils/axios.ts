import axios, { AxiosInstance } from "axios";

const userApi: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/users',
    headers: { "Content-Type": 'application/json' }
})

userApi.interceptors.request.use((config) => {
    const token: string = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default userApi;