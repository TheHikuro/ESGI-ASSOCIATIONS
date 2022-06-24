import { getAxiosInstance, getAxiosInstanceWithoutAuth } from "./apiUtils";

const instance = getAxiosInstance();
const instanceWithoutAuth = getAxiosInstanceWithoutAuth();

export const getAllAssos = async () => {
    const response = await instance.get(`/associations`);
    return response.data['hydra:member'];
}