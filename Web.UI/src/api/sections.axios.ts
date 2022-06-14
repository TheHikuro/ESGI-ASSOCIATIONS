import { getAxiosInstance, getAxiosInstanceWithoutAuth } from "./apiUtils";

// const instance = getAxiosInstance();
const instanceWithoutAuth = getAxiosInstanceWithoutAuth();

export const getSections = async () => {
    const response = await instanceWithoutAuth.get("/sections"); // ?itemsPerPage=1
    console.log('response', response);

    return response.data;
}