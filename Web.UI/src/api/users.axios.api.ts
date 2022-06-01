import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getUser = async (id: string) => {
    const response = await instance.get(`/users/${id}`);
    return response.data;
}