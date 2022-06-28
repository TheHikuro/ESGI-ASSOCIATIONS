import { createSections, deleteSections, getSections, updateSection } from "../../../api/sections.axios";
import { SectionDetails, sectionTypes } from "../reducers/sections";
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

export const updateSections = async (dispatch: Function, section: SectionDetails, sectionId: number) => {
    dispatch({
        type: sectionTypes.UPDATE_SECTION_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await updateSection(section, sectionId);
        dispatch({
            type: sectionTypes.UPDATE_SECTION_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}

export const createSectionAction = async (dispatch: Function, section: SectionDetails) => {
    dispatch({
        type: sectionTypes.CREATE_SECTION_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await createSections(section);
        dispatch({
            type: sectionTypes.CREATE_SECTION_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}

export const deleteSectionActions = async (dispatch: Function, sectionId: number) => {
    dispatch({
        type: sectionTypes.DELETE_SECTION_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await deleteSections(sectionId);
        dispatch({
            type: sectionTypes.DELETE_SECTION_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}