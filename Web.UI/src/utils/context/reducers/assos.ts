import { AssosActionTypes } from "../actions/assos";
export interface EventAssosState {
    id: number,
}
export interface OwnerAssosState {
    id: number,
}
export interface MemberAssosState {
    id: number,
    firstname: string,
    lastname: string,
}

export interface PostsAssosState {
    id: number,
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
    members: MemberAssosState[],
    posts: PostsAssosState[],
}

export interface AssosState {
    assosList: AssosDetails[],
    needRefreshAssos: boolean
}

export const AssosIS: AssosState = {
    assosList: [],
    needRefreshAssos: true
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
    DELETE_ASSOS_EVENT_REQUEST: 'DELETE_ASSOS_EVENT_REQUEST',
    DELETE_ASSOS_EVENT_SUCCESS: 'DELETE_ASSOS_EVENT_SUCCESS',
    CREATE_ASSOS_EVENT_REQUEST: 'CREATE_ASSOS_EVENT_REQUEST',
    CREATE_ASSOS_EVENT_SUCCESS: 'CREATE_ASSOS_EVENT_SUCCESS',
    UPDATE_ASSOS_EVENT_REQUEST: 'UPDATE_ASSOS_EVENT_REQUEST',
    UPDATE_ASSOS_EVENT_SUCCESS: 'UPDATE_ASSOS_EVENT_SUCCESS',
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
                needRefreshAssos: false
            };
        case AssosTypes.DELETE_ASSOS_REQUEST:
            return {
                ...state,
                needRefreshAssos: true
            };
        case AssosTypes.DELETE_ASSOS_SUCCESS:
            return {
                ...state,
                assosList: state.assosList.filter(assos => assos.id !== action.payload),
                needRefreshAssos: true
            };
        case AssosTypes.UPDATE_ASSOS_REQUEST:
            return {
                ...state,
                needRefreshAssos: false
            };
        case AssosTypes.UPDATE_ASSOS_SUCCESS:
            return {
                ...state,
                assosList: [action.payload, ...state.assosList],
                needRefreshAssos: true
            };
        case AssosTypes.CREATE_ASSOS_REQUEST:
            return {
                ...state,
                needRefreshAssos: false
            };
        case AssosTypes.CREATE_ASSOS_SUCCESS:
            return {
                ...state,
                assosList: [action.payload, ...state.assosList],
                needRefreshAssos: true
            };
        case AssosTypes.GET_ASSOS_EVENTS_REQUEST:
            return {
                ...state,
            };
        case AssosTypes.GET_ASSOS_EVENTS_SUCCESS:
            return {
                ...state,
                assosList: action.payload,
                needRefreshAssos: false
            };
        case AssosTypes.DELETE_ASSOS_EVENT_REQUEST:
            return {
                ...state,
                needRefreshAssos: true
            };
        case AssosTypes.DELETE_ASSOS_EVENT_SUCCESS:
            return {
                ...state,
                assosList: action.
                    payload,
                needRefreshAssos: false
            };
        case AssosTypes.UPDATE_ASSOS_EVENT_REQUEST:
            return {
                ...state,
                needRefreshAssos: false
            };
        case AssosTypes.UPDATE_ASSOS_EVENT_SUCCESS:
            return {
                ...state,
                assosList: action.payload,
                needRefreshAssos: false
            };
        case AssosTypes.CREATE_ASSOS_EVENT_REQUEST:
            return {
                ...state,
                needRefreshAssos: false
            };
        case AssosTypes.CREATE_ASSOS_EVENT_SUCCESS:
            return {
                ...state,
                assosList: action.payload,
                needRefreshAssos: false
            };
        default:
            return state;
    }
}
