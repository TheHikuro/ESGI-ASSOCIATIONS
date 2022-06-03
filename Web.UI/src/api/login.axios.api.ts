import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const checkLogin = async (payload: any) => {
    console.log("payload", payload);

    const response = await instance.post(`/login_check`, payload);
    return response.data;
}