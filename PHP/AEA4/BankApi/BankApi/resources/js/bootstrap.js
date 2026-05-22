import axios from 'axios';

const token = document.querySelector('meta[name="csrf-token"]')?.content;

window.axios = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': token,
    },
});

// On 419 the CSRF cookie/token has expired — user must refresh the page.
window.axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 422) {
            error.validationErrors = error.response.data?.errors ?? {};
        }
        error.userMessage =
            error.response?.data?.message ??
            error.message ??
            'Error de xarxa';
        return Promise.reject(error);
    },
);
