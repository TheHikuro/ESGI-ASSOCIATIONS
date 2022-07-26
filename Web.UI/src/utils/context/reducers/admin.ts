import { UserActionTypes } from "../actions/admin";

export interface UsersDetails {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    section: any;
    roles: Array<string>;
    id: number;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    activated: boolean;
    isBanned: boolean;
}

export interface UsersState {
    userList: UsersDetails[];
    needRefreshAdmin: boolean;
}

export const AdminIS: UsersState = {
    userList: [],
    needRefreshAdmin: true
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
                needRefreshAdmin: false
            };
        case AdminTypes.DELETE_USER_REQUEST:
            return {
                ...state,
                needRefreshAdmin: true
            };
        case AdminTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
                userList: action.payload,
                needRefreshAdmin: true
            };
        case AdminTypes.UPDATE_USER_REQUEST:
            return {
                ...state,
                needRefreshAdmin: false
            };
        case AdminTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                userList: [action.payload, ...state.userList],
                needRefreshAdmin: true
            };
        case AdminTypes.CREATE_USER_REQUEST:
            return {
                ...state,
                needRefreshAdmin: true
            };
        case AdminTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                userList: action.payload,
                needRefreshAdmin: false
            };
        default:
            return state;
    }
}
