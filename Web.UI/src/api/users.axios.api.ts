import { UsersDetails } from "../utils/context/reducers/admin";
import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getUsers = async () => {
    const response = await instance.get("/users"); // ?itemsPerPage=1
    return response.data;
}

export const getMyUser = async () => {
    const response = await instance.get("/users/me");
    return response.data;
}

export const updateUser = async (user: UsersDetails, userID: number) => {
    const response = await instance.put(`/users/${userID}`, user);
    return response.data;
}

export const deleteUser = async (userID: number) => {
    const response = await instance.delete(`/users/${userID}`);
    return response.data;
}

export const sendMailToAllUsers = (data: { subject: string, body: string }) => {
    return instance.post("/users/send_global_email", data);
}

export const getMyAssos = async (idUser: number) => {
    const response = await instance.get(`/users/${idUser}/associations`);
    return response.data;
}