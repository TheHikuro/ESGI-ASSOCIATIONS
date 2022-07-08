import { AssosDetails } from "../utils/context/reducers/assos";
import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getAllAssos = async () => {
    const response = await instance.get(`/associations`);
    return response.data['hydra:member'];
}

export const updateAssos = async (data: AssosDetails, assosId: number) => {
    const response = await instance.put(`/associations/${assosId}`, data);
    return response.data;
}

export const deleteAssos = async (assosId: number) => {
    const response = await instance.delete(`/associations/${assosId}`);
    return response.data;
}

export const getPostsByAssos = async (assosId: number) => {
    const response = await instance.get(`/associations/${assosId}/posts`);
    return response.data['hydra:member'];
}