import { AssosDetails } from "../utils/context/reducers/assos";
import { getAxiosInstance, getAxiosInstanceWithoutAuth } from "./apiUtils";

const instance = getAxiosInstance();
const instanceWithoutAuth = getAxiosInstanceWithoutAuth();

export const getAllAssos = async () => {
    const response = await instance.get(`/associations`);
    return response.data;
}

export const createAssos = async (data: AssosDetails, id: number) => {
    const postData = {
        ...data,
        owner: `/api/users/${id.toString()}}`
    }
    const response = await instance.post('/associations', postData);
    return response.data;
}

export const updateAssos = async (data: AssosDetails, assosId: number) => {
    const response = await instance.put(`/associations/${assosId}`, data);
    return response.data;
}

export const deleteAssos = async (assosId: number) => {
    const response = await instance.delete(`/associations/${assosId}`);
    return response.data;
}

export const getMembers = async (assosId: number) => {
    const response = await instance.get(`/associations/${assosId}/members`);
    return response.data;
}

// TODO add route backend
export const removeMembers = async (assosId: number, memberId: number) => {
    const response = await instance.delete(`/associations/${assosId}/members/${memberId}`);
    return response.data;
}

export const getEvents = async (assosId: number) => {
    const response = await instance.get(`/associations/${assosId}/events`);
    return response.data;
}

export const getPosts = async (assosId: number) => {
    const response = await instance.get(`/associations/${assosId}/posts`);
    return response.data;
}