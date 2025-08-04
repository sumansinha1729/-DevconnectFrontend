import axios from 'axios';

const api=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
    withCredentials:false,
});

// Add token to headers if exists
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
        return config;
    }
});

export default api