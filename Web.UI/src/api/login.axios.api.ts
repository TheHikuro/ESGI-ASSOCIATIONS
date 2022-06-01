import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const checkLogin = async (payload: any) => {
    const response = await instance.post(`/api/login`, payload.body);
    return response.data;
}