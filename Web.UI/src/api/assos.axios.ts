import { AssosDetails } from "../utils/context/reducers/assos";
import { getAxiosInstance, getAxiosInstanceWithoutAuth } from "./apiUtils";

const instance = getAxiosInstance();
const instanceWithoutAuth = getAxiosInstanceWithoutAuth();

export const getAllAssos = async () => {
    const response = await instance.get(`/associations`);
    return response.data['hydra:member'];
}

export const updateAssos = async (data: AssosDetails, assosId: number) => {
    const response = await instance.put(`/associations/${assosId}`, data);
    return response.data;
}