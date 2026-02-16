import axios from 'axios';

const getBaseUrl = () => {
    // Force production backend URL when running on deployed frontend
    if (typeof window !== 'undefined' && window.location.hostname.includes('onrender.com')) {
        return 'https://event-management-backend-35ee.onrender.com';
    }

    // Default for local development
    return 'http://localhost:5000';
};

const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token} `;
    }
    return config;
});

export default api;
