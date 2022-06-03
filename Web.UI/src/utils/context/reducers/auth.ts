import { authActionTypes } from "../actions/auth";

export const authTypes = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGOUT_REQUEST: "LOGOUT_REQUEST",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAILURE: "LOGOUT_FAILURE",
    REGISTER_REQUEST: "REGISTER_REQUEST",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAILURE: "REGISTER_FAILURE",
}

export const authIS = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    token: localStorage.getItem("token") || '',
}

export const authReducer = (state = {}, action: authActionTypes) => {
    switch (action.type) {
        case authTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case authTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                token: action.payload,
            };
        case authTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case authTypes.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case authTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
            };
        case authTypes.LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case authTypes.REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case authTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
            };
        case authTypes.REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}