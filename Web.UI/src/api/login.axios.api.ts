import { useStoreContext } from "../utils/context/StoreContext";
import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const checkLogin = async (payload: any) => {
    const response = await instance.post(`/login_check`, payload);
    return response.data;
}

export const registerAction = async (payload: any) => {

    const response = await instance.post(`/users`, payload);
    return response.data;
}

export const checkEmail = async (id: number) => {
    const response = await instance.post(`/users/${id}/send_confirmation_email`);
    return response.data;
}

export const confirmTokenSentByEmail = async (id: number, payload: any) => {
    const response = await instance.post(`/users/${id}/validate_account`, payload);
    return response;
}