import { UserActionTypes } from "../actions/admin";

export interface UsersDetails {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    section: any;
    roles: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    activated: boolean;
}

export interface UsersState {
    userList: UsersDetails[] | null;
}

export const AdminIS: UsersState = {
    userList: [],
}

export const AdminTypes = {
    GET_USERS_REQUEST: 'GET_USERS_REQUEST',
    GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
    DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
}

export const AdminReducer = (state = AdminIS, action: UserActionTypes) => {
    switch (action.type) {
        case AdminTypes.GET_USERS_REQUEST:
            return {
                ...state,
            };
        case AdminTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                userList: action.payload,
            };
        case AdminTypes.DELETE_USER_REQUEST:
            return {
                ...state,
            };
        case AdminTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                userList: action.payload,
            };
        case AdminTypes.UPDATE_USER_REQUEST:
            return {
                ...state,
            };
        case AdminTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                userList: action.payload,
            };
        case AdminTypes.CREATE_USER_REQUEST:
            return {
                ...state,
            };
        case AdminTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                userList: action.payload,
            };
        default:
            return state;
    }
}
