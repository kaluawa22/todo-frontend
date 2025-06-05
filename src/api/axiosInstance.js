import axios from 'axios';


const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    // return response if successful
    response => response,
    // handle request error
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = sessionStorage.getItem('refreshToken');
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: refreshToken
                });
                // save new access token to session storage
                sessionStorage.setItem('accessToken', response.data.access);   
                // update the Authorization header in the original request
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                // retry the original request with the new access token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('refreshToken');      
                window.location.href = '/login'; // Redirect to login page
            }
        }
        return Promise.reject(error);
    });

export default axiosInstance;