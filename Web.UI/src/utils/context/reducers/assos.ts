import { AssosActionTypes } from "../actions/assos";

export interface EventAssosState {
    id: number,
    dateInterval: string,
    active: boolean,
    description: string,
    name: string,
    association: string,
    createdAt: string
}

export interface OwnerAssosState {
    id: number,
    lastname: string,
    firstname: string,
    email: string,
    avatar: string,
}

export interface PostsState {
    id: number,
    content: string,
    createdAt: string,
    owner: string,
}

export interface AssosDetails {
    id: number,
    owner: OwnerAssosState,
    name: string,
    description: string,
    avatar: string | null,
    createdAt: string,
    events: EventAssosState[],
    posts: PostsState[],
}

export interface AssosState {
    assosList: AssosDetails[],
    needRefresh: boolean
}

export const AssosIS: AssosState = {
    assosList: [],
    needRefresh: true
}

export const AssosTypes = {
    GET_ASSOS_REQUEST: 'GET_ASSOS_REQUEST',
    GET_ASSOS_SUCCESS: 'GET_ASSOS_SUCCESS',
    DELETE_ASSOS_REQUEST: 'DELETE_ASSOS_REQUEST',
    DELETE_ASSOS_SUCCESS: 'DELETE_ASSOS_SUCCESS',
    UPDATE_ASSOS_REQUEST: 'UPDATE_ASSOS_REQUEST',
    UPDATE_ASSOS_SUCCESS: 'UPDATE_ASSOS_SUCCESS',
    CREATE_ASSOS_REQUEST: 'CREATE_ASSOS_REQUEST',
    CREATE_ASSOS_SUCCESS: 'CREATE_ASSOS_SUCCESS',
    GET_ASSOS_EVENTS_REQUEST: 'GET_ASSOS_EVENTS_REQUEST',
    GET_ASSOS_EVENTS_SUCCESS: 'GET_ASSOS_EVENTS_SUCCESS',
}

export const AssosReducer = (state = AssosIS, action: AssosActionTypes) => {
    switch (action.type) {
        case AssosTypes.GET_ASSOS_REQUEST:
            return {
                ...state,
            };
        case AssosTypes.GET_ASSOS_SUCCESS:
            return {
                ...state,
                assosList: action.payload,
                needRefresh: false
            };
        case AssosTypes.DELETE_ASSOS_REQUEST:
            return {
                ...state,
                needRefresh: true
            };
        case AssosTypes.DELETE_ASSOS_SUCCESS:
            return {
                ...state,
                assosList: state.assosList.filter(assos => assos.id !== action.payload),
                needRefresh: true
            };
        case AssosTypes.UPDATE_ASSOS_REQUEST:
            return {
                ...state,
                needRefresh: false
            };
        case AssosTypes.UPDATE_ASSOS_SUCCESS:
            return {
                ...state,
                assosList: [action.payload, ...state.assosList],
                needRefresh: true
            };
        case AssosTypes.CREATE_ASSOS_REQUEST:
            return {
                ...state,
                needRefresh: false
            };
        case AssosTypes.CREATE_ASSOS_SUCCESS:
            return {
                ...state,
                assosList: [action.payload, ...state.assosList],
                needRefresh: true
            };
        case AssosTypes.GET_ASSOS_EVENTS_REQUEST:
            return {
                ...state,
            };
        case AssosTypes.GET_ASSOS_EVENTS_SUCCESS:
            return {
                ...state,
                assosList: action.payload,
                needRefresh: false
            };
        default:
            return state;
    }
}
