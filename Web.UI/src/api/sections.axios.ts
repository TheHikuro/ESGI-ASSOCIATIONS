import { SectionDetails } from "../utils/context/reducers/sections";
import { getAxiosInstance, getAxiosInstanceWithoutAuth } from "./apiUtils";

const instance = getAxiosInstance();
const instanceWithoutAuth = getAxiosInstanceWithoutAuth();

export const getSections = async () => {
    const response = await instanceWithoutAuth.get("/sections"); // ?itemsPerPage=1
    return response.data;
}

export const updateSection = async (data: SectionDetails, sectionId: number) => {
    const response = await instance.put(`/sections/${sectionId}`, data);
    return response.data;
}

export const deleteSections = async (sectionId: number) => {
    const response = await instance.delete(`/sections/${sectionId}`);
    return response.data;
}

export const createSections = async (data: SectionDetails) => {
    const response = await instance.post(`/sections`, data);
    return response.data;
}
