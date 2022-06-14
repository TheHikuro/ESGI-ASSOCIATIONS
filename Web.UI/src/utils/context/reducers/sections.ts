import { SectionActionTypes } from "../actions/section";

export const sectionIS = {
    label: '',
    value: ''
}

export const sectionTypes = {
    GET_SECTIONS_REQUEST: 'GET_SECTIONS_REQUEST',
    GET_SECTIONS_SUCCESS: 'GET_SECTIONS_SUCCESS',
    CREATE_SECTION_REQUEST: 'CREATE_SECTION_REQUEST',
    CREATE_SECTION_SUCCESS: 'CREATE_SECTION_SUCCESS',
    DELETE_SECTION_REQUEST: 'DELETE_SECTION_REQUEST',
    DELETE_SECTION_SUCCESS: 'DELETE_SECTION_SUCCESS',
    UPDATE_SECTION_REQUEST: 'UPDATE_SECTION_REQUEST',
    UPDATE_SECTION_SUCCESS: 'UPDATE_SECTION_SUCCESS',
}

export const sectionReducer = (state = sectionIS, action: SectionActionTypes) => {
    switch (action.type) {
        case sectionTypes.GET_SECTIONS_REQUEST:
            return {
                ...state,
            };
        case sectionTypes.GET_SECTIONS_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case sectionTypes.CREATE_SECTION_REQUEST:
            return {
                ...state,
            };
        case sectionTypes.CREATE_SECTION_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case sectionTypes.DELETE_SECTION_REQUEST:
            return {
                ...state,
            };
        case sectionTypes.DELETE_SECTION_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case sectionTypes.UPDATE_SECTION_REQUEST:
            return {
                ...state,
            };
        case sectionTypes.UPDATE_SECTION_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
