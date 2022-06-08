import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getUsers = async () => {
    const response = await instance.get("/users"); // ?itemsPerPage=1
    return response.data["hydra:member"];
}

export const getMyUser = async () => {
    const response = await instance.get("/users/me");
    return response.data;
}