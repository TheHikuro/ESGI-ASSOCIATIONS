import axios from 'axios'

const API_URL = 'http://localhost:3000/';

const getBearer = () => {
    const token = localStorage.getItem('token');
    return token
}

export const getAxiosInstance = () => {
    const instance = axios.create({ baseURL: API_URL });

    instance.interceptors.request.use(
        (request: any) => {
            request.headers = {
                Authorization: `Bearer ${getBearer()}`,
                'Access-Control-Expose-Headers': 'Content-Disposition',
            };

            return request;
        },
        (error: any) => Promise.reject(error),
    );

    return instance;
};