import { getSections } from "../../../api/sections.axios";
import { sectionTypes } from "../reducers/sections";
import { startLoader, endLoader } from "./loader";

export interface SectionActionTypes {
    type: string;
    payload?: any;
}

export const getAllSections = async (dispatch: Function) => {
    dispatch({
        type: sectionTypes.GET_SECTIONS_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await getSections();
        dispatch({
            type: sectionTypes.GET_SECTIONS_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}