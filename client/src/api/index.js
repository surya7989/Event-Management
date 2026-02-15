import axios from 'axios';

const getBaseUrl = () => {
    let url = import.meta.env.VITE_API_URL;

    // Explicit fallback for when env var is missing in production
    if (!url) {
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            url = 'http://localhost:5000';
        } else {
            url = 'https://event-management-backend-35ee.onrender.com';
        }
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }

    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    console.log('API Base URL:', url);
    return url;
};

const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
