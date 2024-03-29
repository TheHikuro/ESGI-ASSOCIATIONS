import { SectionActionTypes } from "../actions/section";

export interface SectionDetails {
    id: number;
    name: string;
    slug: string;
}

export interface SectionState {
    sectionList: SectionDetails[];
    needRefreshSection: boolean;
}

export const sectionIS: SectionState = {
    sectionList: [],
    needRefreshSection: true
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
                sectionList: action.payload,
                needRefreshSection: false
            };
        case sectionTypes.CREATE_SECTION_REQUEST:
            return {
                ...state,
                needRefreshSection: false
            };
        case sectionTypes.CREATE_SECTION_SUCCESS:
            return {
                ...state,
                sectionList: [...state.sectionList, action.payload],
                needRefreshSection: true
            };
        case sectionTypes.DELETE_SECTION_REQUEST:
            return {
                ...state,
                needRefreshSection: false
            };
        case sectionTypes.DELETE_SECTION_SUCCESS:
            return {
                ...state,
                sectionList: state.sectionList.filter(section => section.id !== action.payload),
                needRefreshSection: true
            };
        case sectionTypes.UPDATE_SECTION_REQUEST:
            return {
                ...state,
                needRefreshSection: false
            };
        case sectionTypes.UPDATE_SECTION_SUCCESS:
            return {
                ...state,
                sectionList: [action.payload, ...state.sectionList],
                needRefreshSection: true
            };
        default:
            return state;
    }
}
