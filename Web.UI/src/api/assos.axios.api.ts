import { Association } from "../models/association";
import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();


export const getAllAssos = async (): Promise<Association[]> => {
    const response = await instance.get(`/associations?page=1&itemsPerPage=90`);
    return response.data["hydra:member"].map(mapAssociation);
}

const mapAssociation = (asso: any): Association => {
    return {
        title: asso.name,
        description: asso.description,
        join: false
    }
}