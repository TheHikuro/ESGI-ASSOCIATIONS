const axios = require('axios');
const COLORS = require('./textColor');

module.exports = {
    getAxiosInstanceWithoutAuth: () => {
        const axiosInstance = axios.default.create({
            baseURL: process.env.API_URL,
        });
    
        return axiosInstance;
    },
    getAxiosInstanceWithAuth: (authToken) => {
        const instance = module.exports.getAxiosInstanceWithoutAuth();
    
        instance.interceptors.request.use((request) => {
            request.headers = {
                ...request.headers,
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`
            };

            return request;
        });

        return instance;
    },
    getRenewedToken: async () => {
        const instance = module.exports.getAxiosInstanceWithoutAuth();

        const response = await instance.get('/login_check', {
            data: {
                email: process.env.API_EMAIL,
                password: process.env.API_PASSWORD
            }
        })
        .catch((e) => {
            console.error(COLORS.FgRed, e, COLORS.Reset);
            return;
        })

        return response.data.token;
    },
    getUserInfosById: async (authToken, userId) => {
        const instance = module.exports.getAxiosInstanceWithAuth(authToken);

        const response = await instance.get('/users', {
            params: {
                discordUserId: userId
            }
        })
        .catch((e) => {
            console.log(COLORS.FgRed, e, COLORS.Reset);
            return;
        })
    
        if(response.data.length == 0)
            return;

        return response.data[0];
    }
}