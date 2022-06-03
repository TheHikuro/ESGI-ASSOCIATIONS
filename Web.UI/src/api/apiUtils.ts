import axios from 'axios'

const API_URL = 'http://localhost:3000/api';

const getBearer = () => {
    const token = localStorage.getItem('token');
    return token
}

export const getAxiosInstance = () => {
    const instance = axios.create({ baseURL: API_URL });

    instance.interceptors.request.use(
        (request: any) => {
            if (request.url.includes('login_check') || request.url.includes('users')) {
                return request;
            } else {
                request.headers = {
                    ...request.headers,
                    Authorization: `Bearer ${getBearer()}`,
                    //Accept: 'application/json',
                };
            }

            return request;
        },
        (error: any) => Promise.reject(error),
    );

    return instance;
};